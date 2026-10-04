export class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.hijos = [];
  }

  agregarHijo(nodo) {
    this.hijos.push(nodo);
  }
}

function Placeholder({ titulo }) {
  return <div>Página de {titulo}</div>;
}

export function buildMenu() {
  const raiz = new Nodo({ titulo: "Menu", link: "/", component: null });

  const profile = new Nodo({ titulo: "Profile", link: "/profile", component: Placeholder });
  const messages = new Nodo({ titulo: "Messages", link: "/messages", component: Placeholder });

  const settings = new Nodo({ titulo: "Settings", link: "/settings", component: Placeholder });
  settings.agregarHijo(new Nodo({ titulo: "Account", link: "/settings/account", component: Placeholder }));
  settings.agregarHijo(new Nodo({ titulo: "Profile", link: "/settings/profile", component: Placeholder }));
  settings.agregarHijo(new Nodo({ titulo: "Security & Privacy", link: "/settings/security", component: Placeholder }));
  settings.agregarHijo(new Nodo({ titulo: "Password", link: "/settings/password", component: Placeholder }));
  settings.agregarHijo(new Nodo({ titulo: "Notification", link: "/settings/notification", component: Placeholder }));

  const help = new Nodo({ titulo: "Help", link: "/help", component: Placeholder });
  help.agregarHijo(new Nodo({ titulo: "FAQ's", link: "/help/faqs", component: Placeholder }));
  help.agregarHijo(new Nodo({ titulo: "Submit a Ticket", link: "/help/ticket", component: Placeholder }));
  help.agregarHijo(new Nodo({ titulo: "Network Status", link: "/help/status", component: Placeholder }));

  const logout = new Nodo({ titulo: "Logout", link: "/logout", component: Placeholder });

  raiz.agregarHijo(profile);
  raiz.agregarHijo(messages);
  raiz.agregarHijo(settings);
  raiz.agregarHijo(help);
  raiz.agregarHijo(logout);

  return raiz;
}
