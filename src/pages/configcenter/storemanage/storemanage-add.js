import React from 'react';
import ZEle from 'zero-element';
import config from './config/storemanage_add';
import useBreadcrumb from '@/framework/useBreadcrumb';

export default function () {

    useBreadcrumb([
      { title: '首页' },
      { title: '配置中心' },
      { title: '添加店小二' }
    ]);
  
    return <div>
     <ZEle namespace="storemanage_add" config={config} />
    </div>
  }

// export default () => <ZEle namespace="spirit_add" config={config} />;
