import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// this file is used to fix the page refresh flickers caused by the server side rendering nextjs (when first render, there was a sec that styled component was not applied)
export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
			});

		const initialProps = await Document.getInitialProps(ctx);
		return {
			...initialProps,
			styles: [ ...initialProps.styles, ...sheet.getStyleElement() ]
		};
	}
}
