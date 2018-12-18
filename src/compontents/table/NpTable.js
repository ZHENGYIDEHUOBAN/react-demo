import React from 'react';
import PropTyes from 'prop-types'
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import Array2Tree from 'array-to-tree';

const ResizeableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

class NpTable extends React.Component {
  static PropTyes = {
    columns: PropTyes.array,
    data: PropTyes.array
  }

  static defaultProps = {
    columns: [],
    data: [{ a: 1 }]
  }

  constructor(props) {
    super(props);
    this.state = {
      columns: props.columns,
      data: props.data
    }
  }

  components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      })
    }));
    return (
      <div id="np-table">
        <Table
          pagination={false}
          scroll={{ y: 700, x: 2300 }}
          components={this.components}
          dataSource={this.state.data}
          columns={columns}
          size="small"
          bordered
        >
        </Table>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    const viewData = Array2Tree(nextProps.data, { parentProperty: 'ParentMenuID', customID: 'MenuID' });
    this.setState({ data: viewData });
  }
}

export default NpTable;
