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
      <el-form-item label="字典名称" prop="dictType">
        <el-select v-model="queryParams.dictType">
          <el-option
            v-for="item in typeOptions"
            :key="item.dictId"
            :label="item.dictName"
            :value="item.dictType"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="字典标签" prop="dictLabel">
        <el-input
          v-model="queryParams.dictLabel"
          placeholder="请输入字典标签"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="数据状态"
          clearable
        >
          <el-option
            v-for="dict in dict.type.sys_normal_disable"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
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
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-close"
          size="mini"
          @click="handleClose"
          >关闭</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="dataList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="字典编码" align="center" prop="dictCode" />
      <el-table-column label="字典标签" align="center" prop="dictLabel">
        <template slot-scope="scope">
          <span
            v-if="scope.row.listClass == '' || scope.row.listClass == 'default'"
            >{{ scope.row.dictLabel }}</span
          >
          <el-tag
            v-else
            :type="scope.row.listClass == 'primary' ? '' : scope.row.listClass"
            >{{ scope.row.dictLabel }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="字典键值" align="center" prop="dictValue" />
      <el-table-column label="字典排序" align="center" prop="dictSort" />
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.sys_normal_disable"
            :value="scope.row.status"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        align="center"
        prop="remark"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
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

    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字典类型">
          <el-input v-model="form.dictType" :disabled="true" />
        </el-form-item>
        <el-form-item label="数据标签" prop="dictLabel">
          <el-input v-model="form.dictLabel" placeholder="请输入数据标签" />
        </el-form-item>
        <el-form-item label="数据键值" prop="dictValue">
          <el-input v-model="form.dictValue" placeholder="请输入数据键值" />
        </el-form-item>
        <el-form-item label="样式属性" prop="cssClass">
          <el-input v-model="form.cssClass" placeholder="请输入样式属性" />
        </el-form-item>
        <el-form-item label="显示排序" prop="dictSort">
          <el-input-number
            v-model="form.dictSort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="回显样式" prop="listClass">
          <el-select v-model="form.listClass">
            <el-option
              v-for="item in listClassOptions"
              :key="item.value"
              :label="item.label + '(' + item.value + ')'"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listData,
  addData,
  updateData,
  delData,
  getData,
} from "../../../api/system/dict/data";
import { getType, optionselect } from "../../../api/system/dict/type";
export default {
  name: "Data",
  dicts: ["sys_normal_disable"],
  data() {
    return {
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dictName: undefined,
        dictType: undefined,
        status: undefined,
      },
      // 默认字典类型
      defaultDictType: "",
      // 显示搜索条件
      showSearch: true,
      // 类型数据字典
      typeOptions: [],
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 遮罩层
      loading: true,
      // 字典表格数据
      dataList: [],
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
        dictLabel: [
          { required: true, message: "数据标签不能为空", trigger: "blur" },
        ],
        dictValue: [
          { required: true, message: "数据键值不能为空", trigger: "blur" },
        ],
        dictSort: [
          { required: true, message: "数据顺序不能为空", trigger: "blur" },
        ],
      },
      // 数据标签回显样式
      listClassOptions: [
        {
          value: "default",
          label: "默认",
        },
        {
          value: "primary",
          label: "主要",
        },
        {
          value: "success",
          label: "成功",
        },
        {
          value: "info",
          label: "信息",
        },
        {
          value: "warning",
          label: "警告",
        },
        {
          value: "danger",
          label: "危险",
        },
      ],
    };
  },
  created() {
    const dictId = this.$route.params && this.$route.params.dictId;
    this.getTypeData(dictId);
    this.getTypeList();
  },
  methods: {
    // 查询字典类型详细
    getTypeData(dictId) {
      getType(dictId).then((res) => {
        this.queryParams.dictType = res.data.dictType;
        this.defaultDictType = res.data.dictType;
        this.getList();
      });
    },
    // 查询字典类型列表
    getTypeList() {
      optionselect().then((res) => {
        this.typeOptions = res.data;
      });
    },
    // 查询字典数据列表
    getList() {
      this.loading = true;
      setTimeout(() => {
        listData(this.queryParams)
          .then((res) => {
            this.dataList = res.rows;
          })
          .finally(() => {
            this.loading = false;
          });
      }, 1000);
    },
    // 表单重置
    reset() {
      this.form = {
        dictCode: undefined,
        dictLabel: undefined,
        dictValue: undefined,
        cssClass: undefined,
        listClass: "default",
        dictSort: 0,
        status: "0",
        remark: undefined,
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
      this.queryParams.dictType = this.defaultDictType;
      this.handleQuery();
    },
    // 新增按钮
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加字典数据";
      this.form.dictType = this.defaultDictType;
    },
    // 修改按钮
    handleUpdate(row) {
      this.reset();
      this.open = true;
      this.title = "修改字典数据";
      const dictCode = row.dictCode || this.ids[0];
      getData(dictCode).then((res) => {
        this.form = res.data;
      });
    },
    // 删除按钮
    handleDelete(row) {
      const dictCode = row.dictCode || this.ids[0];
      this.$confirm("是否确认删除字典编码为'" + dictCode + "'的数据项?", {
        title: "系统提示",
        type: "warning",
      })
        .then(() => {
          delData(dictCode);
        })
        .catch(() => {
          this.$tip.message("已取消", "error");
        });
    },
    // 导出按钮
    handleExport() {
      this.download("system/dict/data/export", { ...this.queryParams });
    },
    // 关闭按钮
    handleClose() {
      this.$router.push("/dict");
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.dictCode);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // 提交按钮
    submitForm() {
      if (this.title == "添加字典数据") {
        addData(this.form);
      } else if (this.title == "修改字典数据") {
        updateData(this.form);
      }
      this.open = false;
      this.getList();
    },
    // 取消按钮
    cancel() {},
  },
};
</script>