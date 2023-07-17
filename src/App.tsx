import React, {useState} from 'react';
import Layout from "./components/layout/Layout";
import KanbanDesk from "./components/kanbanDesk/KanbanDesk";

const App = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <div>
            <Layout setSearch={setSearchQuery}/>
            <KanbanDesk searchQuery={searchQuery}/>
        </div>
    );
};

export default App;