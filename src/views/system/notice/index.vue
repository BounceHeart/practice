<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="公告标题">
        <el-input
          v-model="queryParams.noticeTitle"
          placeholder="请输入参数名称"
          clearable
          @keyup.enter.native="handleQuery"
        ></el-input>
      </el-form-item>
      <el-form-item label="操作人员">
        <el-input
          v-model="queryParams.noticeBy"
          placeholder="请输入操作人员"
          clearable
          @keyup.enter.native="handleQuery"
        ></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="queryParams.status" placeholder="公告类型">
          <el-option
            v-for="dict in dict.type.sys_notice_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="mini"
          icon="el-icon-plus"
          @click="handleAdd"
          >新增</el-button
        >
        <el-button
          type="success"
          plain
          size="mini"
          icon="el-icon-edit"
          :disabled="single"
          @click="handleUpdate"
          >修改</el-button
        >
        <el-button
          type="danger"
          plain
          size="mini"
          icon="el-icon-delete"
          :disabled="multiple"
          @click="handleDelete"
          >删除</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="noticeList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column
        label="序号"
        align="center"
        prop="noticeId"
        width="100"
      />
      <el-table-column
        label="公告标题"
        align="center"
        prop="noticeTitle"
        :show-overflow-tooltip="true"
        width="100"
      />
      <el-table-column label="公告类型" align="center" prop="noticeType">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.sys_notice_type"
            :value="scope.row.noticeType"
            width="100"
          />
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status" width="100">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.sys_notice_status"
            :value="scope.row.status"
          ></dict-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="创建者"
        align="center"
        prop="createBy"
        width="100"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <el-dialog :title="title" :visible.sync="open" width="780px" append-to-body>
      <el-form :model="form" ref="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公告标题">
              <el-input
                v-model="form.noticeTitle"
                placeholder="请选择公告标题"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公告类型">
              <el-select
                v-model="form.noticeType"
                placeholder="请选择公告类型"
                clearable
                filterable
              >
                <el-option
                  v-for="dict in dict.type.sys_notice_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in dict.type.sys_notice_status"
                  :key="dict.value"
                  :label="dict.value"
                >
                  {{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容">
              <editor v-model="form.noticeContent" :min-height="192" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button type="primary" @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listNotice,
  getNotice,
  delNotice,
  addNotice,
  updateNotice,
} from "@/api/system/notice";
export default {
  name: "Notice",
  dicts: ["sys_notice_status", "sys_notice_type"],
  data() {
    return {
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        noticeTitle: undefined,
        createBy: undefined,
        status: undefined,
      },
      // 显示搜索条件
      showSearch: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 遮罩层
      loading: true,
      // 公告表格数据
      noticeList: [],
      // 总条数
      total: 0,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        noticeTitle: [
          { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "公告类型不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 查询公告列表
    getList() {
      this.loading = true;
      setTimeout(() => {
        listNotice(this.queryParams)
          .then((res) => {
            this.noticeList = res.rows;
            this.total = res.total;
          })
          .finally(() => {
            this.loading = false;
          });
      }, 1000);
    },
    // 表单重置
    reset() {
      this.form = {
        noticeId: undefined,
        noticeTitle: undefined,
        noticeType: undefined,
        noticeContent: undefined,
        status: "0",
      };
      this.resetForm("form");
    },
    // 搜索按钮
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 重置按钮
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 新增按钮
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加公告";
    },
    // 修改按钮
    handleUpdate(row) {
      this.reset();
      this.open = true;
      this.title = "修改公告";
      const noticeId = row.noticeId || this.ids;
      getNotice(noticeId).then((res) => {
        this.form = res.data;
      });
    },
    // 删除按钮
    handleDelete(row) {
      const noticeId = row.noticeId || this.ids;
      this.$confirm("是否确认删除公告编号为'" + noticeId + "'的数据项", {
        title: "系统公告",
        type: "warning",
      })
        .then(() => {
          delNotice(noticeId);
        })
        .catch(() => {
          this.$tip.message("已取消", "error");
        });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.noticeId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // 提交
    submitForm() {
      if (this.title == "添加公告") {
        addNotice(this.form);
      } else if (this.title == "修改公告") {
        updateNotice(this.form);
      }
      this.open = false;
      this.reset();
    },
    // 取消
    cancel() {
      this.open = false;
      this.reset();
    },
  },
};
</script>

<style>
</style>