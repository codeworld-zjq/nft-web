import { Select } from 'antd'
export default function(){
    function handleChange(value) {
        console.log(`selected ${value}`);
      }

	return  (
        <Select defaultValue="" style={{ width: 120 }} onChange={handleChange}>
            <Option value="1">v1</Option>
            <Option value="2">v2</Option>
            <Option value="3">v3</Option>
            <Option value="4">v4</Option>
            <Option value="5">v5</Option>
        </Select>
    )
}