import React, { useState } from 'react';
import { CommandBar, ICommandBarItemProps, Panel, PanelType } from '@fluentui/react';
import FavContainer from "../containers/favourite-containter";

export const TopBarWithSidebar: React.FC = () => {
  // 状态管理侧边栏的显示与隐藏
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 顶部栏中的按钮项
  const items: ICommandBarItemProps[] = [
    {
      key: 'showFavorites',
      iconOnly: true, // 设置为true表示这是一个仅图标的按钮
      iconProps: { iconName: 'FavoriteStar' }, // 使用内置图标
      onClick: () => setIsSidebarOpen(true),
      // 你可以选择提供一个 ariaLabel 以提高无障碍性
      ariaLabel: 'Show Favorites',
    },
    {
      key: 'refresh',
      iconOnly: true,
      iconProps: { iconName: 'Sync' }, // 使用内置图标
      onClick: () => console.log('Refresh action'),
      ariaLabel: 'Refresh',
    },
  ];

  return (
    <>
        <CommandBar items={items} />
        <Panel
            isOpen={isSidebarOpen}
            type={PanelType.smallFixedNear} // 选择一个合适的Panel样式
            onDismiss={() => setIsSidebarOpen(false)} // 提供一种关闭Panel的方式
            closeButtonAriaLabel="Close"
            headerText="Favorites"
        >
            <p>Your favorite items go here.</p>
            <FavContainer/>
        </Panel>
    </>
  );
};

