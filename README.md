# 📊 Gestor de Gastos - React + Vite + JavaScript

Aplicación web completa para **controlar gastos e ingresos** con backend **Java Servlets + MySQL**.

## 🚀 Características

- **Gestión de Gastos**: Agregar, editar, eliminar, filtrar por categoría
- **Gestión de Ingresos**: Registro completo con fechas
- **Dashboard**: Tarjetas por categoría con totales en tiempo real
- **Persistencia**: MySQL + Servlets (TransaccionServlet)
- **Actualización automática**: Sin refresh manual (useData + refetch)

## 🏗️ Stack Tecnológico

**Frontend:**
- React 18 + Vite (HMR)
- React Router DOM
- Tailwind CSS (custom)
- Context API
- Custom Hooks (useData, usePost, useDelete)

**Backend:**
- Java Servlets
- MySQL Database
- Tomcat Server
- DAO Pattern

## 🌐 Repositorios

**Frontend (este repo):** `gestor-gastos-frontend`

**Backend:** [https://github.com/Kevin-AC/GestionGastosBackend.git](https://github.com/Kevin-AC/GestionGastosBackend.git)

> **¡Importante!** Frontend y Backend son **proyectos separados**

## 🚀 Guía de Inicio Rápido

### 1. Frontend (React + Vite)

```bash
# Clonar repo
git clone https://github.com/tu-usuario/gestor-gastos-frontend.git
cd gestor-gastos-frontend

# Instalar dependencias
npm install

# Ejecutar desarrollo
npm run dev

### 2. Backend (Java + Tomcat)
```
2. Backend (Java + Tomcat)
```bash
# Clonar repo backend (NUEVA TERMINAL)
git clone https://github.com/Kevin-AC/GestionGastosBackend.git
cd gestor-gastos-backend

# Compilar WAR
mvn clean package

# Copiar WAR a Tomcat
cp target/gestor-gastos.war $TOMCAT_HOME/webapps/

# Iniciar Tomcat
$TOMCAT_HOME/bin/startup.sh
```
