import React, { useState } from 'react';
import { Tabs } from 'antd';
import Content from '@/layouts/Content';
import ZEle from 'zero-element';
import useBreadcrumb from '@/framework/useBreadcrumb';

const { TabPane } = Tabs;

export default function Term() {
  useBreadcrumb([
    { title: '主页', path: '/' },
    { title: '系统配置' },
    { title: '系统公告' },
  ]);
  const [type, setType] = useState('SYSTEM_NOTICE');

  function handleChangeTabPane(key) {
    setType(key);
  }

  const config = {
    layout: 'Empty',
    title: '',
    items: [
      {
        layout: 'Empty',
        component: 'Form',
        config: {
          goBack: false,
          API: {
            getAPI: `/api/cms/term/config?type=${type}`,
            updateAPI: '/api/cms/term/config/{id}',
          },
          fields: [
            { field: 'content', label: '', type: 'rich-text',span:24 },
          ]
        }
      }
    ]
  };

  return <Content>
    <Tabs
      destroyInactiveTabPane
      defaultActiveKey={type}
      onChange={handleChangeTabPane}
    >
      {/* <TabPane tab="会员规则" key="MEMBER_RULE"> */}
        <ZEle namespace='sys_notice' config={config} />
      {/* </TabPane> */}
      {/* <TabPane tab="积分规则" key="INTEGRAL_RULE">
        <ZEle namespace='term_integral' config={config} />
      </TabPane>
      <TabPane tab="品牌故事" key="BRAND_STORY">
        <ZEle namespace='term_story' config={config} />
      </TabPane>
      <TabPane tab="隐私策略" key="PRIVACY_POLICY">
        <ZEle namespace='term_policy' config={config} />
      </TabPane> */}
    </Tabs>
  </Content>
}