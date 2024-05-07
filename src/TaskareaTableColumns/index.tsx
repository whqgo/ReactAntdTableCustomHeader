/*
 * @Author: whq
 * @Date: 2022-05-30 10:51:38
 * @LastEditTime: 2024-05-07 14:48:12
 * @LastEditors: whq
 * @Description:
 * @FilePath: \reactViteTemp\src\TaskareaTableColumns\index.tsx
 */
/**
 * 数据元素引用属性设置
 */
import React, { useState, useEffect, Fragment, useRef, useCallback } from 'react';
import './index.css';
import { Button, Checkbox, Input, InputNumber, Modal, Select, Space, Table } from 'antd';

import update from 'immutability-helper';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { cloneDeep } from 'lodash';


interface DraggableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    index: number;
    moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableBodyRowType = 'DraggableBodyRow';

const DraggableBodyRow = ({
    index,
    moveRow,
    className,
    style,
    ...restProps
}: DraggableBodyRowProps) => {
    const ref = useRef<HTMLTableRowElement>(null);
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: DraggableBodyRowType,
        collect: monitor => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
            };
        },
        drop: (item: { index: number }) => {
            moveRow(item.index, index);
        },
    });
    const [, drag] = useDrag({
        type: DraggableBodyRowType,
        item: { index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ''}`}
            style={{ cursor: 'move', ...style }}
            {...restProps}
        />
    );
};

const index: any = (props: any) => {
    const { fillData, type, model, data } = props;
    const [state, setState] = useState<any>({
        modalWidth: '60%',
        modalHeight: '55vh',
    });
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [severalRows, setSeveralRows] = useState<any>()
    useEffect(() => {
        console.log(data.severalRows);

        setSeveralRows(data.severalRows)
    }, [data.severalRows])

    // 新增一条
    const addTableRow = () => {
        setDataSource((dataSource: any) => {
            let _dataSource = cloneDeep(dataSource)
            _dataSource.push({
                id: Date.now(),
                serial: _dataSource.length + 1,
                lable: null,
                visible: true,
                align: 'center',//表头居中
            })

            return _dataSource
        })
    }
    // 最终的 columns
    const [tableColumns, setTableColumns] = useState<any>([
        {
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '60px',
            render: (_: any, __: any, index: number) => index + 1, // 使用 index + 1 作为序号值
        },
        {
            title: '字段名称',
            dataIndex: 'value',
            key: 'value',
            noRender: true,
            styleType: 'multipleSelect',

        },
        {
            title: '显示名称',
            dataIndex: 'lableRename',
            key: 'lableRename',
            noRender: true,
            styleType: 'input',

        },
        {
            title: '可视',
            dataIndex: 'visible',
            key: 'visible',
            styleType: 'checkbox',
            noRender: true,

        },
        {
            title: '宽度',
            dataIndex: 'width',
            key: 'width',
            styleType: 'input',
            noRender: true,

        },
        // {
        //     title: '排序',
        //     dataIndex: 'defaultSortOrder',
        //     key: 'defaultSortOrder',
        //     styleType: 'select',
        //     noRender: true,

        // },
        {
            title: '操作',
            key: 'option',
            width: 100,
            render: (_: any, record: any) => (
                <Space>
                    <Button type="primary" onClick={() => {
                        // 删除
                        setDataSource((dataSource: any) => {
                            let _dataSource = cloneDeep(dataSource)
                            let recindex = _dataSource.findIndex((f: any) => f.id == record.id)

                            _dataSource.splice(recindex, 1)
                            return _dataSource
                        })
                    }} danger>
                        删除
                    </Button>
                </Space>
            ),
        },
    ])
    const moveRow = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const dragRow = dataSource[dragIndex];
            setDataSource(
                update(dataSource, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRow],
                    ],
                }),
            );
        },
        [dataSource],
    );


    const onOK = async (type: any) => {
        if (type) {
            // console.log('%c [ 工作台设置提交 tableColumns] 日志', 'font-size:13px; background:#26A08F; color:#fff;', tableColumns);
            // console.log('%c [ 工作台设置提交 dataSource] 日志', 'font-size:13px; background:#26A08F; color:#fff;', dataSource);
            if (fillData) fillData(1, { tableData: cloneDeep(dataSource), severalRows })

        } else {
            if (fillData) fillData(0)
        }

    }


    const h = () => {
        if (!data) return
        switch (data.type) {

            case "taskarea":
                return (
                    <>
                        <div>前<InputNumber style={{ margin: '0 5px 10px' }} min={1} value={severalRows} onChange={(val) => setSeveralRows(parseInt(val))} />列数值相同的时候，进行单元格合并</div>
                        {/*  这里必须加个key 不然会报错, 社区给的解决方案就是这样的 */}
                        <DndProvider key={Math.random()} backend={HTML5Backend}>
                            <Table
                                columns={tableColumns}
                                dataSource={dataSource}
                                pagination={false}
                                components={{
                                    body: {
                                        row: DraggableBodyRow,
                                    },
                                }}
                                onRow={(_, index) => {
                                    const attr = {
                                        index,
                                        moveRow,
                                    };
                                    return attr as React.HTMLAttributes<any>;
                                }}
                            />
                        </DndProvider>
                    </>
                )
            default:
                return <></>
        }
    }

    const getInit = async () => {

        // console.log(data, "===getInit===");
        // 过滤掉 操作
        let newList = data.columns.filter((f: any) => f.id != 'aaa111bbb222ccc333')

        setDataSource(() => newList)

        // 配置 table columns

        setTableColumns(() => (tableColumns.reduce((preData: any, curData: any) => {


            return !curData.noRender ? [...preData, curData] : [...preData, {
                ...curData,

                render: (_: any, record: any, index: any) => {

                    // console.log(_, record, index);
                    // console.log(curData)

                    return <Fragment>
                        {
                            (() => {
                                switch (curData.styleType) {
                                    case 'input':
                                        return <Input value={record[curData.dataIndex]} onChange={(e) => {
                                            setDataSource((dataSource: any) => {
                                                let _dataSource = cloneDeep(dataSource)
                                                let recordfind = _dataSource.find((f: any) => f.id === record.id)
                                                recordfind[curData.dataIndex] = e.target.value
                                                return _dataSource
                                            })
                                        }} placeholder={'请输入'}></Input>

                                    case 'checkbox':
                                        return <Checkbox onChange={(e) => {
                                            setDataSource((dataSource: any) => {
                                                let _dataSource = cloneDeep(dataSource)
                                                let recordfind = _dataSource.find((f: any) => f.id === record.id)
                                                recordfind[curData.dataIndex] = e.target.checked
                                                return _dataSource
                                            })

                                        }} checked={record[curData.dataIndex]}></Checkbox>
                                    case 'multipleSelect':
                                        return <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            defaultValue={record[curData.dataIndex] || []}
                                            onChange={(value: any) => {
                                                // console.log('%c [multipleSelect value ] 日志', 'font-size:13px; background:#26A08F; color:#fff;', value);
                                                // 修改
                                                setDataSource((dataSource: any) => {
                                                    let _dataSource = cloneDeep(dataSource)
                                                    let recordfind = _dataSource.find((f: any) => f.id === record.id)
                                                    recordfind[curData.dataIndex] = value
                                                    // 判断是不是数值类型 赋值样式  目前
                                                    let numberStyle = ['decimal']

                                                    let isnumberStyle = data.fields.filter((f: any) => value.includes(f.c)).find((f2: any) => numberStyle.includes(f2.t))
                                                    if (isnumberStyle) {
                                                        recordfind.styleType = 'def'
                                                    } else {
                                                        recordfind.styleType = 'number'
                                                    }


                                                    return _dataSource
                                                })

                                            }}
                                            options={data.fields.map((item: any) => {

                                                return {
                                                    value: item.c,
                                                    label: item.n,
                                                }
                                            })}
                                        />
                                    case 'select':
                                        return <Select
                                            defaultValue={record[curData.dataIndex] || ''}
                                            style={{ width: 120 }}
                                            allowClear
                                            onChange={(value: any) => {
                                                // 修改
                                                setDataSource((dataSource: any) => {
                                                    let _dataSource = cloneDeep(dataSource)
                                                    let recordfind = _dataSource.find((f: any) => f.id === record.id)
                                                    recordfind[curData.dataIndex] = value

                                                    return _dataSource
                                                })

                                            }}
                                            options={[
                                                {
                                                    value: '',
                                                    label: '无',
                                                },
                                                {
                                                    value: 'descend',
                                                    label: '降序',
                                                },
                                                {
                                                    value: 'ascend',
                                                    label: '升序',
                                                },
                                            ]}
                                        />
                                    default:
                                        return <div>暂无内容</div>
                                }
                            })()
                        }

                    </Fragment>

                }
            }]


        }, [])))

    }

    useEffect(() => {
        if (!data) return
        getInit()
    }, [])

    useEffect(() => {
        // console.log(dataSource, "===dataSource===监听修改");
    }, [dataSource])



    return (
        <>
            <Modal
                width={state.modalWidth}
                style={{ top: 50 }}
                destroyOnClose={true}
                centered={false}
                title={(() => {
                    return '设置列表'
                })()}
                open={data?.isShow}
                // onOk={onOK}
                // onCancel={() => setIsShow(false)}
                footer={(() => {
                    let footer = [
                        <Button key="quxiao3" onClick={() => onOK(0)} size={'large'}>
                            取消
                        </Button>,
                        <Button key="xinzengyitiao" type="primary" onClick={() => addTableRow()} size={'large'}>
                            新增一条
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => onOK(1)} size={'large'}>
                            确定
                        </Button>
                    ]
                    return footer
                })()}
                maskClosable={false}
                className="TaskareaTableColumnsCss"
                closable={false}
                bodyStyle={{
                    height: state.modalHeight,
                    position: 'relative',
                    display: 'flex',
                    overflow: 'auto',
                }}
            >
                <div style={{ width: '100%' }}>
                    {
                        (data?.isShow) && h()
                    }
                </div>
            </Modal>
        </>
    );
};
export default index
