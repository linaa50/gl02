const express = require('express');
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
  getMyArticles,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');
const { protect } = require('../middlewares/authMiddleware');

// Lecture publique
router.get('/', getAllArticles);

// Exercice 2 : doit être déclarée AVANT '/:id', sinon "my-articles" serait pris pour un id
router.get('/my-articles', protect, getMyArticles);

router.get('/:id', getArticleById);

// Écriture protégée
router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

module.exports = router;