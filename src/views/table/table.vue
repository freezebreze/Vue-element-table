<template>
	<section>
		<el-row >
			<el-col :span="24">
				<!-- 表单 -->
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<el-form-item label="姓名" >
						<el-input v-model.trim="formInline.user.name" placeholder="输入姓名" style="width: 140px;"></el-input>
					</el-form-item>
					
					<el-form-item label="出生日期">
						<el-date-picker
						v-model="formInline.user.date"
						align="right"
						type="datetime"
						placeholder="选择出生日期"
						></el-date-picker>
					</el-form-item>
					
					<el-form-item label="地址">
						<el-cascader
						:options="options"
						v-model="formInline.user.address"
						:props="{ expandTrigger: 'hover' }"
						>
						</el-cascader>
					</el-form-item>
					<!-- 动态渲染列表 -->
					<el-form-item label="籍贯">
						<el-select v-model="formInline.user.place">
							<el-option
							v-for="item of places"
							:key="item.index"
							:label="item.label"
							:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
					<el-button @click = "onSubmit" type="primary" style="margin-left: 35px;">查询</el-button>
					<el-button @click = "oninitData" style="margin-left: 35px;">添加数据</el-button>
				</el-form>
				<!-- 表格 -->
				<el-table
				v-loading="loading"
				ref = "myform"
				height="620"
				:data="getPage"
				style="width: 100%"
				border
				>
					<el-table-column type="selection"></el-table-column>
					<el-table-column prop = "date" label="出生日期" width="180" ></el-table-column>
					<el-table-column prop = "name" label="姓名" width="180" ></el-table-column>
					<el-table-column prop = "address" label="地址" ></el-table-column>
					<el-table-column label="操作">
						<template ref = "edit" slot-scope= "scope">
							<el-button type="primary" size="small" @click="handleEdit(scope.$index + (currentPage - 1) * pageSize, scope.row)">编辑</el-button>
							<el-button type="danger" size="small" @click="handleDelete(scope.$index + (currentPage - 1) * pageSize, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
					<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-size="pageSize"
					:total="pageTotl"
					:page-sizes="[10, 20, 30, 40, 50]"
					layout="total, sizes, prev, pager, next, jumper"
					>
					</el-pagination>
				</div>
			</el-col>
		</el-row>
		<el-dialog
		title="修改个人信息"
		:visible.sync="editFormVisible"
		>
		<el-form
		ref="form"
		:model="form"
		label-width="80px"
		>
		<el-form-item label="姓名">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="地址">
			<el-input v-model="form.address"></el-input>
		</el-form-item>
		<el-form-item label="出生日期">
			<el-date-picker
			type="date"
			placeholder="选择日期"
			v-model="form.date"
			style="width: 100%;"
			>
			</el-date-picker>
		</el-form-item>
		<el-form-item>
			<el-button
			type="primary"
			@click="handleSave"
			:loading="editLoading"
			>修改
			</el-button>
			<el-button @click="editFormVisible = false">取消</el-button>
		</el-form-item>
		</el-form>
		</el-dialog>
		<el-dialog
		title="录入数据"
		:visible="addFormVisible">
			<el-form
			ref="addform"
			:model="addForm"
			label-width="80px"
			>
			<el-form-item label="姓名">
				<el-input v-model="addForm.name"></el-input>
			</el-form-item>
			<el-form-item label="地址">
				<el-input v-model="addForm.address"></el-input>
			</el-form-item>
			<el-form-item label="出生日期">
				<el-date-picker
				 type="datetime"
				 placeholder="选择日期"
				 v-model="addForm.date"
				 style="width: 100%;"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button
				type="primary"
				@click="onAdd"
				:loading="editLoading"
				>确定
				</el-button>
				<el-button @click="addFormVisible = false">取消</el-button>
			</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog
		title="查询结果"
		:visible.sync="searchVisible">
		<el-table
		:data="showTableData">
		<el-table-column prop="date" label="日期" width="150"></el-table-column>
		<el-table-column prop="name" label="姓名" width="200"></el-table-column>
		<el-table-column prop="address" label="地址"></el-table-column>
		</el-table>
		</el-dialog>
		<el-dialog
		title="提示信息"
		:visible.sync="deleteVisible">
		<div style="margin-bottom: 20px;">此操作将删除数据，要继续吗？</div>
		<el-button @click = "handleRemove()" type="primary">确认</el-button>
		<el-button @click = "deleteVisible = false" >取消</el-button>
		</el-dialog>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				/*
				formInline: 表单输入的值,用于查询
				form: 用于获取表格当前行的值, this.form = Object.assign({}, row);
				addForm: 添加数据时输入的值
				addTable: 存储添加的数据
				showTableData： 存储查询到的数据用于展示
				tableData: axios请求拿到的数据 用于渲染表格
				options: axios请求拿到的数据  渲染地址下拉列表 
				places: axios 请求拿到的数据 渲染籍贯下拉列表
				pageTotl: 表格数据的总数
				pageSize: 每页显示多少条数据
				currentPage: 当前页码
				table_index: 当前行的下标
				*/
				formInline: {
					user: {
						name: '',
						date: '',
						address: '',
						place: ''
					}
				},
				form: {
					name: '',
					address: '',
					date: ''
				},
				addForm: {
					name: '',
					address: '',
					date: ''
				},
				tableData: [],
				options: [],
				places: [],
				addTable: [],
				showTableData: [],
				pageTotl: 0,
				pageSize: 10,
				currentPage: 1,
				table_index: 0,
				editFormVisible: false,
				editLoading: false,
				reMoveFormVisible: false,
				addFormVisible: false,
				searchVisible: false,
				loading: true,
				deleteVisible: false
			}
		},
		created() {
			this.$http({
				url: '/api/getTable',
				method: 'GET'
			}).then(res => {
				res = res.data;
				this.tableData = res.datas;
				this.pageTotl = this.tableData.length;
				setTimeout(() => {
					this.loading = false;
				},1000);
			}).catch(err => {
				console.log(err);
			});
			this.$http({
				url: '/api/getOptions',
				method: 'GET'
			}).then(res => {
				res = res.data;
				this.options = res.datas;
				this.places = res.places;
			}).catch(err => {
				console.log(err);
			});
		},
		methods: {
			/*
			onSubmit()
			查询当前输入的name是否存在
			oninitData()
			初始化存储添加数据的数组 
			onAdd()
			添加数据
			handleEdit(index, row)
			编辑当前行的数据
			handleDelete(index)
			删除当前行的数据
			handleSave()
			保存编辑好的数据
			handleSizeChange(val)
			更新当前每页显示的数量
			handleCurrentChange(val)
			更新当前页码
			*/
			onSubmit() {
				let searchName = this.formInline.user.name;
				let len = this.tableData.length;
				let flag = false;
				this.showTableData = [];
				if(searchName !== undefined) {
					for(let i = 0; i < len; i++) {
						if(searchName === this.tableData[i].name) {
							if(this.showTableData.indexOf(this.tableData[i]) === -1){
								this.showTableData.push(this.tableData[i]);
								flag = true;
							}
						}else {
								flag = true;
							}
					}
					if(flag) {
						this.searchVisible = true;
					}
				}
			},
			oninitData() {
				this.addFormVisible = true;
				this.addForm = {};
			},
			onAdd() {
				let date = this.addForm.date
				date = [date.getFullYear(), (date.getMonth() + 1), (date.getDate())].join('-');
				this.addForm.date = date;
				this.tableData.push(this.addForm);
				this.pageTotl++;
				this.$message({
					message: '添加成功',
					type: 'success',
					duration: 1000
				})
				this.addFormVisible = false;
			},
			handleEdit(index, row) {
				// console.log(index);
				this.editFormVisible = true;
				this.form = Object.assign({}, row);
				this.table_index = index;
			},
			handleDelete(index) {
				this.deleteVisible = true;
				this.table_index = index;
			},
			handleSave() {
					this.$confirm('此操作会修改原始数据，要继续吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						center: true
					}).then(() => {
						this.editLoading = true;
						let date = this.form.date;
						if (typeof date === "object") {
							date = [date.getFullYear(), (date.getMonth() + 1), (date.getDate())].join('-');
							this.form.date = date;
						}
						this.tableData.splice(this.table_index, 1, this.form);
						this.$message({
						message: "修改成功",
						type: 'success'
						});
			          this.editLoading = false;
			          this.editFormVisible = false;
						}).catch(() => {
				
						});
					},
			handleRemove() {
				this.tableData.splice(this.table_index, 1);
				this.pageTotl--;
				this.$message({
					message: '删除成功',
					type: 'success',
					duration: 1000
				})
				this.deleteVisible = false;
			},
			handleSizeChange(val) {
				// console.log(val);
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				// console.log(val);
				this.currentPage = val;
			}
		},
		computed: {
			getPage() {
				return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
			}
		}
	}
</script>

<style scoped="scoped">
	section {
		margin-left: 5px;
	}
.el-pagination {
	margin-top: 30px;
	text-align: center;
}
</style>
