import React, { useCallback } from "react";

interface ClickEvent {
  preventDefault(): void;
  target: HTMLElement & { getAttribute(name: string): string | null };
}

interface SubItem {
  id: string;
  label: string;
  link: string;
  parentId: string;
}

interface MenuItem {
  id?: string;
  label: string;
  icon?: string;
  link?: string;
  click?: (e: ClickEvent) => void;
  stateVariables?: boolean;
  subItems?: SubItem[];
  isHeader?: boolean;
}

const Navdata = () => {
  const [isDashboardOpen, setIsDashboardOpen] = React.useState<boolean>(false);

  const updateIconSidebar = useCallback((e: ClickEvent) => {
    const subItems = e.target.getAttribute("sub-items");
    if (!subItems) return;

    const ul = document.getElementById("two-column-menu");
    const iconItems = ul?.querySelectorAll(".nav-icon.active");

    iconItems?.forEach((item) => {
      item.classList.remove("active");
      const id = item.getAttribute("sub-items");
      if (id) {
        const menuElement = document.getElementById(id);
        menuElement?.parentElement?.classList.remove("show");
      }
    });

    e.target.classList.add("active");
  }, []);

  const toggleDashboard = useCallback(() => {
    setIsDashboardOpen((prev) => !prev);
    document.body.classList.remove("twocolumn-panel");
  }, []);

  const menuItems: MenuItem[] = [
    // 1) Formulario único de agregar proyectos
    {
      label: "Agregar proyectos",
      icon: "ri-file-add-line",
      link: "/agregar-proyectos",
    },

    // 2) Encabezado para la sección de gestión
    {
      isHeader: true,
      label: "Gestionar proyectos",
    },

    // 3) Gestión individual por categoría
    {
      label: "Extensionista",
      icon: "ri-briefcase-line",
      link: "/gestionar-proyectos/extensionista",
    },
    {
      label: "Voluntariado",
      icon: "ri-hand-heart-line",
      link: "/gestionar-proyectos/voluntariado",
    },
  {
  isHeader: true,
  label: "Registros Académicos",
 },
 {
  label: "Agregar Estudiante",
  icon: "ri-user-add-line",
  link: "/agregar-estudiante",
 },
 {
  label: "Gestión de Estudiantes",
  icon: "ri-user-line",
  link: "/gestionar-estudiantes",
 },
];

  return {
    props: {
      children: menuItems,
    },
  };
};

export default Navdata;