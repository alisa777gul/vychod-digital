import css from "./Projects.module.css";
import { projects } from "../../data/projects";

const Projects = () => {
  return (
    <section id="projekty" className={css.projects}>
      <div className="container">
        <h2>
          Naše <span>projekty</span>
        </h2>

        <ul className={css.list}>
          {projects.map((project) => (
            <li key={project.id} className={css.card}>
              <img
                src={project.image}
                alt={project.title}
                className={css.image}
              />

              <div className={css.content}>
                <span className={css.tag}>React</span>
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pozrieť projekt
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;
