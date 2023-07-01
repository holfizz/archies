import React, {FC} from "react";

interface Project {
    title: string;
}

interface ProjectsProps {
    projects: Project[];
}

const ProjectCard: FC<ProjectsProps> = ({projects}) => {
    return (
        <div>
            {/*{projects.map((item: Project, index: number) => (*/}
            {/*    <div className={cls.projectCard}>*/}
            {/*        <h3 key={index}>*/}
            {/*            {item.title}*/}
            {/*        </h3>*/}
            {/*    </div>*/}

            {/*))}*/}
            piper enterprise
        </div>
    )
}

export default ProjectCard
