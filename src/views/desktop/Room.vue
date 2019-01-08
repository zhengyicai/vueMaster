<template>

<el-row :gutter="24" style="margin-top:20px">
  <el-col :span="4">
      <div class=" bg-purple">
           <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree> 

      </div>
  </el-col>
  <el-col :span="20">
      <div class="grid-content bg-purple">
          
          <el-table :data="datalist" highlight-current-row v-loading="listLoading" style="width: 100%;">
		
			
			<el-table-column prop="roomNo" label="房间编号" width="220" sortable>
			</el-table-column>
			<el-table-column prop="roomName" label="房间名称" width="220" sortable>
			</el-table-column>
			
			<el-table-column  label="状态" min-width="150">
				<template slot-scope="scope">{{ state(scope.row.state)}}</template>
			</el-table-column>
            
			
			<el-table-column label="操作" min-width="250">
				<template scope="scope">
				
                <!-- <el-button size="small" type="primary" @click="showRelationPanel(scope.$index,scope.row)">住房信息</el-button>
                <el-button size="small" type="danger" @click="deleteRow(scope.$index,scope.row)">删除</el-button> -->
                 <el-button size="small" type="warning"   @click="updateState(scope.row)" >编辑</el-button>
                 <el-button size="small" type="primary"   @click="updateRoom(scope.row)">房卡管理</el-button>
                <!--<el-button size="small" type="info" v-if="scope.row.state==='30'"  @click="updateState(scope.row,'10')">授权</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
		 	class="pull-right clearfix"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-size="totalsize" 
			layout="total, prev, pager, next, jumper"
			:total="total" 
		>
		</el-pagination>

        <el-dialog   title="修改房间名称" :visible.sync="dialogFormVisible" >
			<el-form ref="subData" :model="subData" label-width="100px" @submit.prevent="onSubmit" style="margin:20px;">
                    
                    <el-form-item label="房间名称">
                        <el-input v-model="subData.roomName"  placeholder="请输入楼栋名称 例如：1"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
					<el-radio-group v-model="subData.state">
						<el-radio label="10">正常</el-radio>
						<el-radio label="20">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
                   
			</el-form>	
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="open()">确 定</el-button>
			</div>
        </el-dialog>


        <el-dialog   title="房卡管理" :visible.sync="dialogFormVisibleRoom" >
			<el-form ref="subData" :model="subData1" label-width="100px" @submit.prevent="onSubmit" style="margin:20px;">
                    
                 
                 
                <el-form-item label="卡号1">
                        <el-input v-model="one" type="number" placeholder="请输入10位数的卡号"></el-input>
                </el-form-item>
                <el-form-item label="卡号2">
                        <el-input v-model="two"  placeholder="请输入10位数的卡号"></el-input>
                </el-form-item>
                <el-form-item label="卡号3">
                        <el-input v-model="three"  placeholder="请输入10位数的卡号"></el-input>
                </el-form-item>
                <el-form-item label="卡号4">
                        <el-input v-model="four"  placeholder="请输入10位数的卡号"></el-input>
                </el-form-item>
                <el-form-item label="卡号5">
                        <el-input v-model="free"  placeholder="请输入10位数的卡号"></el-input>
                </el-form-item>
               
                   
			</el-form>	
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleRoom = false">取 消</el-button>
				<el-button type="primary" @click="open1()">确 定</el-button>
			</div>
        </el-dialog>



     
      
      
      
      
      
      </div>
    </el-col>
</el-row>

</template>

<style lang="scss" scoped>
    .page-container {
        font-size: 24px;
        text-align: center;
        color: rgb(192, 204, 218);
    }
    .el-tree {
        cursor: default;
        background: #fff;
         border:none;
    }
</style>
<script>
	//2
	import { RequestPost } from '../../api/api';
    import { RequestGet } from '../../api/api';
	import { url } from '../../api/api';
	import {timeFormat} from '../../api/format';
	import {dateFormat} from '../../api/format';
	import {state} from '../../api/format';
	import { PageSize } from '../../api/api';
	import moment from 'moment';
  	export default {
	  
    methods: {
	  dateFormat,	
	  timeFormat,
	  state,	
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
		this.loadData();


	  },
    
	
	loadData(){

	
        this.loadTreeData();
        
						
	
    },


    showAddPanel(){
           this.dialogFormVisible  = true;
           this.subData ={
            "communityId":this.communityId,
            "unitNumber":1,
            "floorNumber":1,
            "roomNumber":1,
            "buildingNo":"",   
            "unitName":""
        }


    },
    open(){
       
        RequestPost("/room/update",this.subData).then(response => {
                    if(response.code=='0000'){
                        this.$message({
                            message: response.message,
                            type: 'success'
                        });  
                        this.dialogFormVisible = false;
                    }else{
                        this.$message({
                            message: response.message,
                            type: 'error'
                        });
                    }
                    //this.loadData();
                    //this.communityId = this.subData.communityId;
                    this.loadCommunityData();
        }).catch(error => {
        this.$router.push({ path: '/login' });
        })

    },
     open1(){

        this.subData1.cardNos = this.one+","+this.two+","+this.three+","+this.four+","+this.free;  
        RequestPost("/room/addCard",this.subData1).then(response => {
                    if(response.code=='0000'){
                        this.$message({
                            message: response.message,
                            type: 'success'
                        });  
                        this.dialogFormVisibleRoom = false;
                    }else{
                        this.$message({
                            message: response.message,
                            type: 'error'
                        });
                    }
                    //this.loadData();
                    //this.communityId = this.subData.communityId;
                    this.loadCommunityData();
        }).catch(error => {
        this.$router.push({ path: '/login' });
        })

    },
    updateState(rows){
         this.dialogFormVisible = true;
         this.subData = rows;
          

           


      },
    updateRoom(rows){
         this.dialogFormVisibleRoom = true;
         this.subData1 = {};
         this.subData = rows;
         this.one = "";
         this.two = "";
         this.three = "";
         this.four = "";
         this.free = "";

         this.subData1.buildingId = rows.buildingId;
         this.subData1.communityId = rows.communityId;
         this.subData1.roomId  = rows.id;
         this.subData1.unitId = rows.unitId;


         RequestGet("/room/findCards",{roomId:rows.id}).then(response => {
                    if(response.code=='0000'){
                          if(response.data.length>0){
                              for(var i = 0 ;i<response.data.length;i++){
                                  if(i ==0){
                                      this.one = response.data[i].cardNo;
                                  }else if(i ==1){
                                      this.two = response.data[i].cardNo;
                                  }else if(i ==2){
                                      this.three = response.data[i].cardNo;
                                  }else if(i ==3){
                                      this.four = response.data[i].cardNo;
                                  }else if(i ==4){
                                      this.free = response.data[i].cardNo;
                                  }
                              }
                          }
                          


                    }else{
                        this.$message({
                            message: response.message,
                            type: 'error'
                        });
                    }
                    //this.loadData();
                    //this.communityId = this.subData.communityId;
                    this.loadCommunityData();
        }).catch(error => {
        this.$router.push({ path: '/login' });
        })
         

    },  
    addCard(){
         this.dialogFormVisible = true;   
    },
    
    /**
    * 加载楼栋数据
    */
    loadCommunityData(){
        
            
        RequestGet("/room/findRooms",{
                buildingId:this.buildingId,
                unitId:this.unitId
            }).then(response => {
                    if(response.code == '0000'){
                                this.datalist = response.data;
                                this.total = response.page.totalCount; 
                                this.totalsize  = response.page.pageSize;
                    }
					
		}).catch(error => {
						 this.$router.push({ path: '/login' });
						
        })  


    },

    handleNodeClick(data) {

        console.log(data.parentId);
        if(data.parentId !=undefined && data.parentId !="" && data.parentId !=null){
                this.buildingId = data.parentId;
                this.unitId = data.id;
                this.loadCommunityData();
        }
         this.loadCommunityData();
       
       
    },
     /**
    * 加载小区树型数据
    */
    loadTreeData(){
        RequestGet("/room/findTree").then(response => {
            if(response.code == '0000'){
                //alert( response.data);
                
                var item = [];

                if(response.data.length>0){
                     for(var i= 0 ;i<response.data.length;i++){
                            var person ={
                                    label: response.data[i].value,
                                    id: response.data[i].id,
                                    children:response.data[i].children
                            };

                            if(i==0){
                                this.communityId = response.data[i].id;
                                 this.loadCommunityData();
                            }

                            if(person.children) 
                           
                           item.push(person);

                    }

                   
                }
               

                this.tree = [{
                    label: '小区管理',
                    children: item,
                    id:''
                }];
                   //this.tree[0].children = response.data; 
                    //tree = response.data;
            }
					
		}).catch(error => {
			 this.$router.push({ path: '/login' });
						
		})  
        
    }
    
  



	},
	//1
	created:function(){
		//3
		this.loadData();
		
	
	},
    data() {
      return {
		total:0,     //数据的总数量
		totalsize:0,  //总的页数 = 总数量/每页显示的条数
        currentPage:1,
        listLoading: false,
        communityId:'',
        buildingId:'',
        unitId:"",
        dialogFormVisible:false,
        dialogFormVisibleRoom:false,
        subData:{},
        subData1:{
            buildingId:"",
            communityId:"",
            roomId:"",
            cardNos:"",
            unitId:""

        },
        one:"",
        two:"",
        three:"",
        four:"",
        free:"",
        page:{
			pageSize:PageSize,   //一页显示的条数
            criteria:''
        },
        tree: [],

        defaultProps: {
          children: 'children',
          label: 'label'
        },
     

        datalist:[],
       
       
      };
    }
  }
</script>