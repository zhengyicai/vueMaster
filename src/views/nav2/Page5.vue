<template> 
 <div class="block">   
		<el-table :data="datalist" highlight-current-row v-loading="listLoading" style="width: 100%;">
		
			
			<el-table-column prop="communityNo" label="小区编号" width="120" sortable>
			</el-table-column>
			<el-table-column prop="communityName" label="	小区名称" width="120" sortable>
			</el-table-column>
			<el-table-column prop="province" label="省份" width="120" sortable>
			</el-table-column>
			<el-table-column prop="city" label="城市" width="120" sortable>
			</el-table-column>
			<el-table-column prop="area" label="区县" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="address" label="地址" min-width="180" sortable>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="state" label="状态" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="userName" label="物业员用户名" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="userStatus" label="物业员状态" min-width="120" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-size="totalsize" 
			layout="total, prev, pager, next, jumper"
			:total="total" 
		>
		</el-pagination>
  </div>
</template>
<script>
	//2
	import { url } from '../../api/api';
  	export default {
	  
    methods: {
      handleSizeChange(val) {
		console.log(`每页 ${val} 条`);
		

      },
      handleCurrentChange(val) {
		console.log(`当前页: ${val}`);
		this.pageNumber = val;

		
		this.page.pageNumber = val;
		/**
		 * 1.get 请求传参数，必须是json前面加一个params
		 * 2.post传参数不需要在json对象传值前面带params
		 */
		this.$axios.get(url+'/community/findAll', {params:this.page}).then(response => {
			 			if(response.data.code == '0000'){
								 this.datalist = response.data.data;
								 this.total = response.data.page.totalCount;
								 this.totalsize  = response.data.page.pageSize;
						 }
                 
                }).catch(error => {
                  console.log(error)
        })


      }
	},
	//1
	created:function(){
		//3
		 this.page.pageNumber = 1;
		 this.$axios.get(url+'/community/findAll', {params:this.page}).then(response => {
			 			if(response.data.code == '0000'){
								 this.datalist = response.data.data;
								 this.total = response.data.page.totalCount;
								 this.totalsize  = response.data.page.pageSize;
						 }
                 
                }).catch(error => {
                  console.log(error)
        })
	},
    data() {
      return {
		total:0,
		totalsize:0,
		currentPage: 1,
		pageNumber:1,
		datalist:[],
		page:{
			pageSize:1,
			pageNumber:this.pageNumber
		},
		listLoading: false
      };
    }
  }
</script>