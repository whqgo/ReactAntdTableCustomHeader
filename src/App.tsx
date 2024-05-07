/*
 * @Author: whq
 * @Date: 2024-05-07 10:52:01
 * @LastEditTime: 2024-05-07 15:24:10
 * @LastEditors: whq
 * @Description: 
 * @FilePath: \reactViteTemp\src\App.tsx
 */
import { useEffect, useState } from 'react'
import './App.css'
import { Button, Checkbox, Input, InputNumber, Modal, Select, Space, Table } from 'antd';
import TaskareaTableColumns from './TaskareaTableColumns';
import { cloneDeep } from 'lodash'
import { fixedFields, MNData } from './json'
function App() {
  const [taskareaTableColumnsData, setTaskareaTableColumnsData] = useState({
    isShow: false, //控制显示隐藏
    type: 'taskarea',
    fields: fixedFields, // 当前字段的 模型数据  , 目的是为了 对字段的控制, 业务需要, 
    // 用于修改 和默认
    columns: [
      // {
      //     serial: '', // 
      //     lable: '', //表头的名称 多个用 /  隔开
      //     lableRename: '', //表头的 重命名名称 优先级高于lable 
      //     value: [], // 要读取数据的字段key要读取数据的字段key 和 lable 关系对应
      //     expression:'',// 表达式,fields存在的才能做计算
      //     width: '',//宽度
      //     defaultSortOrder: '',// 数据 的 排序方式
      //     style:'',//样式
      //     visible:'',//可视
      //     noRender:true,// 是否 重写 render
      //... 和 antd table columns 配置一样
      // }
      {
        key: 'workDispatchOrdersProcessN.paiGongDanHao',
        id: '1', //
        serial: '1',
        // lable: ['工序名称', '派工单号'], //表头的名称 多个用 /  隔开
        lableRename: '工序/单号', //表头的 重命名名称 优先级高于lable 
        title: '工序/单号', //表头的最终 重命名名称 优先级高于lable 
        value: ['workDispatchOrdersProcessN', 'paiGongDanHao'], // 要读取数据的字段key 和 lable 关系对应
        expression: '',// 表达式,fields存在的才能做计算
        width: '',//宽度
        visible: true,//可视
        defaultSortOrder: '',// 数据 的 排序方式 
        styleType: 'def',//样式风格  def 默认文本  number 数字样式
        style: {},//样式
        align: 'center',//表头居中
      },
      {
        key: 'workDispatchOrdersItemN',
        id: '2', // 
        serial: '2', // 
        // lable: ['物品名称'], //表头的名称 多个用 /  隔开
        lableRename: '物品', //表头的 重命名名称 优先级高于lable 
        title: '物品',
        value: ['workDispatchOrdersItemN'], // 要读取数据的字段key
        expression: '',// 表达式,fields存在的才能做计算
        width: '',//宽度
        defaultSortOrder: '',// 数据 的 排序方式
        visible: true,//可视
        styleType: 'def',//样式风格  def 默认文本  number 数字样式
        style: { flex: 3 },//样式
        align: 'center',//表头居中
      },
      {
        key: 'yxfw',
        id: '22', // 
        serial: '22', // 
        // lable: ['物品名称'], //表头的名称 多个用 /  隔开
        lableRename: '规格', //表头的 重命名名称 优先级高于lable 
        title: '规格',
        value: ['yxfw'], // 要读取数据的字段key
        expression: '',// 表达式,fields存在的才能做计算
        width: '',//宽度
        defaultSortOrder: '',// 数据 的 排序方式
        visible: true,//可视
        styleType: 'def',//样式风格  def 默认文本  number 数字样式
        style: { flex: 3 },//样式
        align: 'center',//表头居中
      },
      {
        key: 'oiwo',
        id: '222', // 
        serial: '222', // 
        // lable: ['物品名称'], //表头的名称 多个用 /  隔开
        lableRename: '库存代码', //表头的 重命名名称 优先级高于lable 
        title: '库存代码',
        value: ['oiwo'], // 要读取数据的字段key
        expression: '',// 表达式,fields存在的才能做计算
        width: '',//宽度
        defaultSortOrder: '',// 数据 的 排序方式
        visible: true,//可视
        styleType: 'def',//样式风格  def 默认文本  number 数字样式
        style: { flex: 3 },//样式
        align: 'center',//表头居中
      },
      {
        key: 'cqsw',
        id: '2222', // 
        serial: '2222', // 
        // lable: ['物品名称'], //表头的名称 多个用 /  隔开
        lableRename: '客户简称', //表头的 重命名名称 优先级高于lable 
        title: '客户简称',
        value: ['cqsw'], // 要读取数据的字段key
        expression: '',// 表达式,fields存在的才能做计算
        width: '',//宽度
        defaultSortOrder: '',// 数据 的 排序方式
        visible: true,//可视
        styleType: 'def',//样式风格  def 默认文本  number 数字样式
        style: { flex: 3 },//样式
        align: 'center',//表头居中
      },
      {
        key: 'frbz.sene',
        id: '3',
        serial: '3',
        // lable: ['主设备名称'], //表头的名称 多个用 /  隔开
        lableRename: '主设备/设备部位', //表头的 重命名名称 优先级高于lable 
        title: '主设备',
        value: ['frbz', 'sene'], // 要读取数据的字段key
        expression: '',// 表达式,fields存在的才能做计算
        width: '',//宽度
        defaultSortOrder: '',// 数据 的 排序方式
        visible: true,//可视
        styleType: 'def',//样式风格  def 默认文本  number 数字样式
        style: {},//样式
        align: 'center',//表头居中
      },
      {
        key: 'dmvl.jiHuaShengChanShuLiang.mvit',
        id: '4',
        serial: '4',
        lable: ['实际生产数量', '计划生产数量', '审核中'], //表头的名称 多个用 /  隔开
        lableRename: '实际生产数量/计划生产数量', //表头的 重命名名称 优先级高于lable 
        title: '实际生产数量/计划生产数量',
        value: ['dmvl', 'jiHuaShengChanShuLiang', 'mvit'], // 要读取数据的字段key
        expression: "`${socketMessageWSDataFind ? (socketMessageWSDataFind['dmvl'] || record['dmvl'] || 0) : record['dmvl'] || 0}/${record['jiHuaShengChanShuLiang'] || 0}`",// 表达式,fields存在的才能做计算
        width: '',//宽度
        defaultSortOrder: '',// 数据 的 排序方式
        visible: true,//可视
        styleType: 'number',//样式风格  def 默认文本  number 数字样式
        style: { textAlign: 'start', flex: 3 },//样式\
        align: 'center',//表头居中
      },
      // {
      //     key: 'dmvl.jiHuaShengChanShuLiang',
      //     id: '5',
      //     serial: '5',
      //     lable: ['实际生产数量', '计划生产数量'], //表头的名称 多个用 /  隔开
      //     lableRename: '实际生产数量12/计划生产数量333', //表头的 重命名名称 优先级高于lable 
      //     value: ['dmvl', 'jiHuaShengChanShuLiang'], // 要读取数据的字段key
      //     expression: "",// 表达式,fields存在的才能做计算
      //     width: '',//宽度
      //     defaultSortOrder: '',// 数据 的 排序方式
      //     visible: true,//可视
      //     styleType: 'number',//样式风格  def 默认文本  number 数字样式
      //     style: { textAlign: 'start', flex: 3 },//样式\
      //     align: 'center',//表头居中
      // },

      {
        title: '操作',
        key: 'action',
        serial: '000000',
        id: 'aaa111bbb222ccc333',
        noRender: true,// 是否 重写 render
        align: 'center',//表头居中
        visible: true,//可视
        width: '300px',
        render: (_: any, record: any) => {
          return <div className='operation-item-content-taskarea'><div style={{ 'justifyContent': 'space-evenly', flex: '1' }}>
            <div className='operation-badge-taskarea1'>

              <div style={{}}>
                <Button type="primary" onClick={() => {
                  console.log("操作====按钮触发", record);
                }} size={'large'}>
                  按钮
                </Button>
              </div>
            </div>
          </div></div>
        },
      },
    ],
    severalRows: 3// 控制合并行数
  })
  // 最终的 columns
  const [tableColumns, setTableColumns] = useState<any>([])
  const taskareaTableColumnsFillData = (FillDatType: any, tableColumnsFillData: any) => {
    // console.log(tableColumnsFillData, "===tableColumnsFillData===");
    // console.log(FillDatType, "===isShow===");
    // console.log(taskareaTableColumnsData, "===isShow===");

    if (FillDatType) {
      setTaskareaTableColumnsData((taskareaTableColumnsData: any) => {

        let _taskareaTableColumnsData = cloneDeep(taskareaTableColumnsData)

        _taskareaTableColumnsData.isShow = false
        _taskareaTableColumnsData.columns = [...tableColumnsFillData.tableData, _taskareaTableColumnsData.columns[_taskareaTableColumnsData.columns?.length - 1]]
        _taskareaTableColumnsData.severalRows = tableColumnsFillData.severalRows

        return _taskareaTableColumnsData

      })
    } else {
      setTaskareaTableColumnsData((taskareaTableColumnsData: any) => ({ ...taskareaTableColumnsData, isShow: false }))
    }
  }
  const [workDispatchOrdersData, setWorkDispatchOrdersData] = useState<any>([])//数据



  // 初始化数据
  const getInit = async () => {
    setWorkDispatchOrdersData(() => MNData)
  }



  useEffect(() => {
    if (!taskareaTableColumnsData?.columns) return

    if (workDispatchOrdersData?.length) {

      setTableColumns(() => (taskareaTableColumnsData.columns.reduce((preData: any, curData: any) => {

        // 判断是否可视
        if (curData.visible) {
          return curData.noRender ? [...preData, curData] : [...preData, {
            ...curData,
            title: (record: any) => {
              let titleStr = curData?.lableRename || (taskareaTableColumnsData.fields.filter((f: any) => curData.value.includes(f.c))).map((f1: any) => f1.n).join('/')
              return <div>
                {titleStr}
              </div>
            },
            width: curData.width ? !isNaN(curData.width) ? curData.width + 'px' : curData.width : '',
            render: (_: any, record: any, index: any) => {

              // console.log(_, record, index);
              // console.log(curData)

              return (
                <div className='operation-item-content-taskarea'>
                  <div>
                    {
                      (() => {
                        switch (curData.styleType) {
                          case 'def':

                            return curData?.value?.map((cITem: any, i: number) => {
                              return <div key={i}> {record[cITem]}</div>
                            })
                          case 'number':
                            let socketMessageWSDataFind = null


                            // 获取字段 模型的属性 
                            let filterModels = fixedFields.filter((f: any) => curData?.value.includes(f.c))
                            // 判断是不是 自定义的模型 需要特殊处理
                            let customDefinitionFind: any = filterModels.find((f: any) => f.sourceDataType == "customDefinition")



                            return <div style={{ justifyContent: 'start' }}>
                              {/* <div className='operation-badge-taskarea'>{`${item['dmvl'] || 0}/${item['jiHuaShengChanShuLiang']}`}</div> */}
                              {/*  没有推送的时候 查询模型   实际生产数量/计划生产数量 */}
                              <div className='operation-badge-taskarea'>{curData?.expression ? eval(curData.expression) : curData?.value?.reduce((preValData: any, curValData: any) => {
                                // return preValData + (record[curValData] ? (record[curValData]) : '')
                                return [...preValData, record[curValData] || 0]
                              }, []).join('/')}
                                {/* 审核中 样式样式处理  */}
                                {
                                  customDefinitionFind && <div className={customDefinitionFind?.className}>{eval(customDefinitionFind?.expression) || ''}</div>
                                }
                              </div>



                            </div>

                          default:
                            return curData?.value?.map((cITem: any, i: number) => {
                              return <div key={i}> {record[cITem]}</div>
                            })
                        }
                      })()
                    }

                  </div>
                </div>
              )
            },
            onCell: (record: any, index: number) => {
              const cIndex = taskareaTableColumnsData.columns.findIndex(cItem => cItem.id === curData.id)

              if (curData.styleType === 'def' && cIndex + 1 <= taskareaTableColumnsData.severalRows) {
                try {

                  if (index) { // 不是第一条
                    const preD = workDispatchOrdersData[index - 1], nextD = workDispatchOrdersData[index];
                    if (!preD || !nextD) return {}
                    let preV = '', nextV = '';
                    curData.value.map((item: string) => {
                      preV += preD[item]
                      nextV += nextD[item]
                    })

                    if (preV === nextV) { // 上一条和当前条相等，不渲染
                      return { rowSpan: 0 }
                    }
                  }

                  if (index !== workDispatchOrdersData.length - 1) { // 不是最后一条
                    let unlikeIndex = workDispatchOrdersData.length - index; // 默认全部相等
                    for (let i = index; i < workDispatchOrdersData.length; i++) {
                      const nextD = workDispatchOrdersData[i + 1], currentD = workDispatchOrdersData[i];
                      if (!nextD) break;
                      let currentV = '', nextV = '';
                      curData.value.map((item: string) => {
                        currentV += currentD[item]
                        nextV += nextD[item]
                      })
                      if (i !== workDispatchOrdersData.length - 1 && nextV !== currentV) { // 当前条和下一条不相等，就是需要合并的数
                        unlikeIndex = i - index + 1
                        break;
                      }
                    }
                    return { rowSpan: unlikeIndex }
                  }
                } catch (err) { console.log(err); }
              }
              return {}
            }
          }]
        } else {

          return preData
        }


      }, [])))
    }

  }, [workDispatchOrdersData, taskareaTableColumnsData.columns])


  useEffect(() => {
    getInit()
  }, [])
  return (
    <div className="App">

      {
        taskareaTableColumnsData.isShow && <TaskareaTableColumns data={taskareaTableColumnsData} fillData={taskareaTableColumnsFillData} />
      }
      <div>
        <Button onClick={() => {
          setTaskareaTableColumnsData((data) => ({ ...data, isShow: true }))
        }}> 设置表头</Button>
      </div>
      {
        tableColumns && <Table
          bordered
          columns={tableColumns as any}
          className='taskarea-table-css'
          dataSource={workDispatchOrdersData}
          pagination={false}
          rowKey='id'
        />
      }
    </div>
  )
}

export default App
