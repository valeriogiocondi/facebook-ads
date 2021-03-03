// HOC
import PageComponent from '../_PageComponent/PageComponent';

import './PageDetailComponent.less';


type PageComponentProps = { };
type PageComponentState = { };
type PageDetailComponentProps = { };
type PageDetailComponentState = { };

class PageDetailComponent<PageDetailComponentProps extends PageComponentProps, PageDetailComponentState extends PageComponentState> extends PageComponent<PageComponentProps, PageComponentState> {

	constructor(props: PageDetailComponentProps) {
		super(props);
		this.state = {};
	}

	getRenderTemplate = (Component: any, title: string) => {
		return this.getTemplate(Component, "page-detail", title);
	}
}

export default PageDetailComponent;