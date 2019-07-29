import * as React from 'react'

import { ISideBarProps } from './ISideBarProps';

export default class SideBar extends React.Component<ISideBarProps, any> {

    constructor(props: ISideBarProps) {
        super(props);
    }

    public componentWillReceiveProps(nextProps: ISideBarProps) {

    }

    public render(): React.ReactElement<ISideBarProps> {
        return (
            <div className='SidebarMenu'>

            </div>
        );
    }

}