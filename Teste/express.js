/**
 * Configurações iniciais
 */

 const express = require('express');
 const app = express();
 const port = 4000;
 
 // Indica ao servidor que iremos trabalhar com JSON 
 app.use(express.json());
 
 /*
     Simula um banco de dados
 */ 
 let items = [
     { id: 1, name: "Engenharia de Software"},
     { id: 2, name: "Sistemas de Informação"},
 ];
 
 /**
  * 
  * Endpoint para buscar os dados da lista
  * 
  */
 
 app.get('/items', (req, res) => {
     res.status(200).json(items);
 });
 
 app.get('/items/count', (req, res) => {
     res.status(200).json({ count: items.length });
 });
 
 app.get('/items/:id', (req, res) => {
     const id = parseInt(req.params.id);
     const item = items.find(item => item.id === id);
     if (item) {
         res.status(200).json(item);
     } else {
         res.status(404).json({ message: "Item não encontrado" });
     }
 });
 
 app.post('/items', (req, res) => {
     const { name } = req.body;
 
     // Validação do campo name
     if (!name || typeof name !== 'string' || name.length < 3) {
         return res.status(400).json({ message: "O campo 'name' deve ser uma string com pelo menos 3 caracteres." });
     }
 
     const newItem = { id: items.length + 1, name };
     items.push(newItem);
     res.status(201).json(newItem);
 });
 
 app.delete('/items/:id', (req, res) => {
     const id = parseInt(req.params.id);
     const index = items.findIndex(item => item.id === id);
     if (index !== -1) {
         items.splice(index, 1);
         res.status(200).json({ message: "Item removido!" });
     } else {
         res.status(404).json({ message: "Item não encontrado" });
     }
 });
 
 app.delete('/items', (req, res) => {
     items = [];
     res.status(200).json({ message: "Todos os itens foram removidos!" });
 });
 
 app.put('/items/:id', (req, res) => {
     const id = parseInt(req.params.id);
     const index = items.findIndex(item => item.id === id);
     if (index !== -1) {
         items[index] = { id, ...req.body };
         res.status(200).json(items[index]);
     } else {
         res.status(404).json({ message: "Item não encontrado!" });
     }
 });
 
 app.patch('/items/:id', (req, res) => {
     const id = parseInt(req.params.id);
     const index = items.findIndex(item => item.id === id);
     if (index !== -1) {
         const { name } = req.body;
         if (name && typeof name === 'string' && name.length >= 3) {
             items[index].name = name;
             res.status(200).json(items[index]);
         } else {
             return res.status(400).json({ message: "O campo 'name' deve ser uma string com pelo menos 3 caracteres." });
         }
     } else {
         res.status(404).json({ message: "Item não encontrado!" });
     }
 });
 
 app.listen(port, () => {
     console.log(`O servidor está rodando em http://localhost:${port}`);
 });