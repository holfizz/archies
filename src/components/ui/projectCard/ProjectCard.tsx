import React, {FC} from "react";
import cls from './ProjectCard.module.scss'

interface Project {
    title: string;
}

interface ProjectsProps {
    projects?: Project[];
}

const ProjectCard: FC<ProjectsProps> = ({projects}) => {
    return (
        <div className={cls.card}>
            {/*{projects.map((item: Project, index: number) => (*/}
            {/*    <div className={cls.projectCard}>*/}
            {/*        <h3 key={index}>*/}
            {/*            {item.title}*/}
            {/*        </h3>*/}
            {/*    </div>*/}

            {/*))}*/}
        </div>
    )
}

export default ProjectCard
