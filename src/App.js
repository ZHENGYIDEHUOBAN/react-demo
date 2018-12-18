import React, { Component } from 'react';
import './App.css';
import { login, loadData } from './api';
import NpTable from './compontents/table/NpTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      columns: [
        { dataIndex: 'Name', title: '菜单名称', width: 220 },
        { dataIndex: 'Keyword', title: '关键字', width: 150 },
        { dataIndex: 'Sequ', title: '排序', width: 40 },
        { dataIndex: 'Type', title: '类型', width: 45 },
        {
          title: '菜单和窗体相关信息', align: 'center',
          children: [
            { dataIndex: 'MenuID', title: '菜单ID', width: 100 },
            { dataIndex: 'RouterMenuPath', title: '路由菜单路径', width: 100 },
            { dataIndex: 'GridID', title: '窗体ID', width: 100 },
            { dataIndex: 'GridHtmlPath', title: '窗体路径', width: 120 },
            { dataIndex: 'GridExtJson', title: '窗体配置文件', width: 200 }
          ]
        },
        {
          title: '菜单和窗体相关信息', align: 'center',
          children: [
            { dataIndex: 'FormID', title: '表单ID', width: 100 },
            { dataIndex: 'FormHtmlPath', title: '表单路径', width: 120 },
            { dataIndex: 'FormExtJson', title: '表单配置文件', width: 200 }
          ]
        },
        { dataIndex: 'ShowType', title: '菜单类型', width: 60 },
        { dataIndex: 'ModuleCode', title: '分类码编号', width: 100 },
        { dataIndex: 'ModuleName', title: '分类码名称', width: 100 }
      ]
    }
  }
  

  render() {
    return (
      <div className="App">
        <NpTable data={this.state.dataSource} columns={this.state.columns}></NpTable>
      </div>
    );
  }

  async init() {
    const result = await login('admin', 'NJPoweron@123');
    if (result.success === true) {
      const data = await loadData({ KeyWord: 'NPS_DEV_MenuWin' });
      this.setState({ dataSource: JSON.parse(data.value).map(v => { v['key'] = v['ID']; return v; }) });
    }
  }

  componentDidMount() {
    this.init();
  }
}

export default App;
