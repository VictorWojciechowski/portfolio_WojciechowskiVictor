import { useParams, Link, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectNotes from "../components/ProjectNotes";
import GalleryProject from "../components/GalleryProject";
import { FaGithub } from "react-icons/fa";


export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const navigate = useNavigate();

  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  if (!project) {
    return (
      <div className="py-10">
        <p>Projet introuvable.</p>
        <Link to="#" onClick={goBack} className="underline">
          ← Retour
        </Link>
      </div>
    );
  }

  const isGallery = project.type === "gallery";
  const isScreenshot = project.type === "screenshot";
  const isEmbed = project.type === "embed";

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <Link
          to="#"
          onClick={goBack}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-sm hover:bg-gray-50"
        >
          ← Retour
        </Link>
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        <div className="text-gray-500 flex items-center gap-2">
          <span>{project.year}</span>
          <span>•</span>
          <span>{project.category}</span>
        </div>
      </header>

      <section className="space-y-4">
        {isScreenshot && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg shadow"
            loading="lazy"
          />
        )}
        {isGallery && <GalleryProject project={project} />}
        </section>

      <div className="flex flex-wrap gap-2">
        {(project.techStack || []).map((t) => (
          <span
            key={t}
            className="rounded-full border border-gray-200 px-2 py-0.5 text-xs"
          >
            {t}
          </span>
        ))}
      </div>

      <section className="space-y-4 text-sm leading-relaxed">
        {project.notes && <ProjectNotes notes={project.notes} />}

        {(project.links?.code || project.links?.demo) && (
  <div className="flex gap-4 pt-4">
    {project.links?.code && (
      <a
        href={project.links.code}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 px-6 py-2 min-w-[140px] bg-gray-800 text-white rounded hover:bg-gray-700 transition"
      >
        <FaGithub /> Voir le code
      </a>
    )}
    {project.links?.demo && (
      <a
        href={project.links.demo}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
      >
        Demo live
      </a>
    )}
  </div>
)}
      </section>
    </article>
  );
}
