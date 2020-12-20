import PageComponent from '../_PageComponent/PageComponent';

// STYLE
import './PageListComponent.less';


type PageComponentProps = { };
type PageComponentState = { };
type PageListComponentProps = { };
type PageListComponentState = { };

class PageListComponent<PageListComponentProps extends PageComponentProps, PageListComponentState extends PageComponentState> extends PageComponent<PageComponentProps, PageComponentState> {

	constructor(props: PageListComponentProps) {
		super(props);
		this.state = {};
	}

	getRenderTemplate = (Component: any, title: string) => {
		return this.getTemplate(Component, "page-list", title);
	}

	pagination = () => {
	}
}

export default PageListComponent; 