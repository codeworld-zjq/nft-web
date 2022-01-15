import React, { useState } from 'react';
import { Checkbox, Spin } from 'antd';
import { query } from 'zero-element-antd/lib/utils/request';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';

export default function CustomCheckboxFetch({
  className,
  props, defaultValue, value,
  options, namespace,
  ...rest
}) {
  const { API, dataField = 'records',
    label: optLabel = 'label', value: optValue = 'value'
  } = options;
  const [loading, setLoading] = useState(false);
  const [optionList, setOptionList] = useState([]);

  const { onChange } = rest;

  useDidMount(getData);

  function getData() {
    if (API) {
      const fAPI = formatAPI(API, {
        namespace,
      });
      setLoading(true);
      query(fAPI)
        .then(data => {
          const list = Array.isArray(data) ?
            data
            : data[dataField];

          if (Array.isArray(list)) {
            setOptionList(list.map(item => ({
              label: item[optLabel],
              value: item[optValue],
            })));
          } else {
            console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
          }
        })
        .finally(_ => {
          setLoading(false);
        })
    }
  }

  function handleChange(data){
    const nData = [];
    data.map(item => {
      const i = {};
      i.id = item;
      nData.push(i)
    })
    onChange(nData)
  }

  function formatData(data, num){
    const d = [];
    if(data && Array.isArray(data) && data.length > 0){
      if(data[0] && data[0].id){
        data.map(item => {
          d.push(item.id+'')
        })
        return d;
      }else{
        console.error('checkbox 数据异常, 数据格式为[{"id": "1"}]]')
      }
    }
  }

  return <Spin className={className} spinning={loading}>
    <Checkbox.Group
      defaultValue={typeof defaultValue === 'string' ? [] : formatData(defaultValue,2)}
      value={typeof value === 'string' ? [] : formatData(value,1)}
      options={optionList}
      {...rest}
      {...props}
      onChange={handleChange}
    />
  </Spin>
}