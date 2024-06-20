import { AppBar, ToggleThemeButton, Layout } from 'react-admin';

export const Toolbar = () => (
    <AppBar toolbar={<ToggleThemeButton />} />
);

export const MainLayout = (props) => <Layout {...props} appBar={Toolbar} />;

