import React from 'react';
import Layout from "./components/layout/Layout";
import KanbanDesk from "./components/kanbanDesk/KanbanDesk";

const App = () => {
    return (
        <div>
            <Layout/>
            <KanbanDesk/>
        </div>
    );
};

export default App;