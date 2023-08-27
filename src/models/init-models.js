var DataTypes = require("sequelize").DataTypes;
var _datos_persona = require("./datos_persona");
var _tipo_usuario = require("./tipo_usuario");
var _usuarios = require("./usuarios");
var _log_transacciones = require("./log_transacciones");
var _modulos = require("./modulos");
var _password_reset = require("./password_reset");
var _permisos = require("./permisos");
var _permisos_modulos = require("./permisos_modulos");
var _permisos_usuarios = require("./permisos_usuarios");
var _planes = require("./planes");
var _planes_detalles = require("./planes_detalles");
var _planes_usuarios = require("./planes_usuarios");
var _registro_recarga = require("./registro_recarga");
var _registro_retiro = require("./registro_retiro");
var _registro_transferencia = require("./registro_transferencia");
var _tipo_bolsillo = require("./tipo_bolsillo");
var _saldo_bolsillo_global = require("./saldo_bolsillo_global");
var _testimony = require("./testimony");
var _usuarios_bolsillo = require("./usuarios_bolsillo");
var _usuarios_contacto = require("./usuarios_contacto");
var _usuarios_verificacion = require("./usuarios_verificacion");

function initModels(sequelize) {
  var datos_persona = _datos_persona(sequelize, DataTypes);
  var tipo_usuario = _tipo_usuario(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var log_transacciones = _log_transacciones(sequelize, DataTypes);
  var modulos = _modulos(sequelize, DataTypes);
  var password_reset = _password_reset(sequelize, DataTypes);
  var permisos = _permisos(sequelize, DataTypes);
  var permisos_modulos = _permisos_modulos(sequelize, DataTypes);
  var permisos_usuarios = _permisos_usuarios(sequelize, DataTypes);
  var planes = _planes(sequelize, DataTypes);
  var planes_detalles = _planes_detalles(sequelize, DataTypes);
  var planes_usuarios = _planes_usuarios(sequelize, DataTypes);
  var registro_recarga = _registro_recarga(sequelize, DataTypes);
  var registro_retiro = _registro_retiro(sequelize, DataTypes);
  var registro_transferencia = _registro_transferencia(sequelize, DataTypes);
  var tipo_bolsillo = _tipo_bolsillo(sequelize, DataTypes);
  var saldo_bolsillo_global = _saldo_bolsillo_global(sequelize, DataTypes);
  var usuarios_bolsillo = _usuarios_bolsillo(sequelize, DataTypes);
  var usuarios_contacto = _usuarios_contacto(sequelize, DataTypes);
  var usuarios_verificacion = _usuarios_verificacion(sequelize, DataTypes);

  saldo_bolsillo_global.belongsToMany(usuarios, {  through: usuarios_bolsillo, foreignKey: "id_bolsillo", otherKey: "id_usuario" });
  usuarios.belongsToMany(saldo_bolsillo_global, { through: usuarios_bolsillo, foreignKey: "id_usuario", otherKey: "id_bolsillo" });
  usuarios.belongsTo(datos_persona, { foreignKey: "id_persona"});
  datos_persona.hasMany(usuarios, { foreignKey: "id_persona"});
  permisos_modulos.belongsTo(modulos, { foreignKey: "id_modulo"});
  modulos.hasMany(permisos_modulos, {  foreignKey: "id_modulo"});
  permisos_modulos.belongsTo(permisos, {foreignKey: "id_permiso"});
  permisos.hasMany(permisos_modulos, {  foreignKey: "id_permiso"});
  permisos_usuarios.belongsTo(permisos, {foreignKey: "id_permisos"});
  permisos.hasMany(permisos_usuarios, {foreignKey: "id_permisos"});
  planes_detalles.belongsTo(planes, { foreignKey: "id_plan"});
  planes.hasMany(planes_detalles, { foreignKey: "id_plan"});
  planes_usuarios.belongsTo(planes, { foreignKey: "id_plan"});
  planes.hasMany(planes_usuarios, { foreignKey: "id_plan"});
  usuarios_bolsillo.belongsTo(saldo_bolsillo_global, {  foreignKey: "id_bolsillo"});
  saldo_bolsillo_global.hasMany(usuarios_bolsillo, { foreignKey: "id_bolsillo"});
  saldo_bolsillo_global.belongsTo(tipo_bolsillo, { foreignKey: "id_tipo_bolsillo"});
  tipo_bolsillo.hasMany(saldo_bolsillo_global, {  foreignKey: "id_tipo_bolsillo"});
  usuarios.belongsTo(tipo_usuario, {  foreignKey: "id_tipo_usuario"});
  tipo_usuario.hasMany(usuarios, { foreignKey: "id_tipo_usuario"});
  password_reset.belongsTo(usuarios, {  foreignKey: "id_users"});
  usuarios.hasOne(password_reset, { foreignKey: "id_users"});
  permisos_usuarios.belongsTo(usuarios, {foreignKey: "id_usuarios"});
  usuarios.hasMany(permisos_usuarios, {  foreignKey: "id_usuarios"});
  planes_usuarios.belongsTo(usuarios, {  foreignKey: "id_usuario"});
  usuarios.hasMany(planes_usuarios, {  foreignKey: "id_usuario"});
  registro_recarga.belongsTo(usuarios, {  foreignKey: "id_usuario_receptor"});
  usuarios.hasMany(registro_recarga, {  foreignKey: "id_usuario_receptor"});
  registro_retiro.belongsTo(usuarios, {foreignKey: "id_usuario"});
  usuarios.hasMany(registro_retiro, { foreignKey: "id_usuario"});
  registro_transferencia.belongsTo(usuarios, {  foreignKey: "id_usuario_emisor"});
  usuarios.hasMany(registro_transferencia, {  foreignKey: "id_usuario_emisor"});
  registro_transferencia.belongsTo(usuarios, {  foreignKey: "id_usuario_receptor"});
  usuarios.hasMany(registro_transferencia, {  foreignKey: "id_usuario_receptor"});
  usuarios_bolsillo.belongsTo(usuarios, { foreignKey: "id_usuario"});
  usuarios.hasMany(usuarios_bolsillo, { foreignKey: "id_usuario"});
  usuarios_contacto.belongsTo(usuarios, { foreignKey: "id_usuario_contacto"});
  usuarios.hasMany(usuarios_contacto, { foreignKey: "id_usuario_contacto"});
  usuarios_contacto.belongsTo(usuarios, { foreignKey: "id_usuario"});
  usuarios.hasMany(usuarios_contacto, { foreignKey: "id_usuario"});
  usuarios_verificacion.belongsTo(usuarios, {foreignKey: "id_usuario"});
  usuarios.hasMany(usuarios_verificacion, {foreignKey: "id_usuario"});

  return {
    datos_persona,
    log_transacciones,
    modulos,
    password_reset,
    permisos,
    permisos_modulos,
    permisos_usuarios,
    planes,
    planes_detalles,
    planes_usuarios,
    registro_recarga,
    registro_retiro,
    registro_transferencia,
    saldo_bolsillo_global,
    testimony,
    tipo_bolsillo,
    tipo_usuario,
    usuarios,
    usuarios_bolsillo,
    usuarios_contacto,
    usuarios_verificacion,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
