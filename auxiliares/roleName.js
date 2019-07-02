const role = {
  admin: "Administrador",
  geral: "Geral",
  socio: "Sócio"
};

exports.roleName = {
  admin: role.admin,
  geral: role.geral,
  socio: role.socio
};

function allRoles() {
  return [role.admin, role.geral, role.socio];
}

exports.getAllRoles = allRoles;
