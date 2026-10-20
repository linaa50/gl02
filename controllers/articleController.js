const Article = require('../models/articleModel');
const User = require('../models/userModel');

const handleError = (err, res) => {
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Identifiant de ressource invalide (format ObjectId attendu)' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    handleError(err, res);
  }
};

const createArticle = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    if (!title || !content || !authorId) {
      return res.status(400).json({ message: 'title, content et authorId sont obligatoires' });
    }
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Auteur non trouve (identifiant authorId invalide)' });
    }
    const newArticle = await Article.create({ title, content, author: authorId });
    res.status(201).json(newArticle);
  } catch (err) {
    handleError(err, res);
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article non trouve' });
    res.status(200).json(article);
  } catch (err) {
    handleError(err, res);
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!article) return res.status(404).json({ message: 'Article introuvable pour la mise a jour' });
    res.status(200).json(article);
  } catch (err) {
    handleError(err, res);
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article introuvable pour la suppression' });
    res.status(200).json({ message: 'Article supprime avec succes', id: req.params.id });
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = { getAllArticles, createArticle, getArticleById, updateArticle, deleteArticle };