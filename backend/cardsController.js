import Cards from "./cards.js";

class CardsController {
  async create(req, res) {
    try {
      const { city, club, date, link } = req.body;
      const cards = await Cards.create({ city, club, date, link });
      res.json(cards);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const cards = await Cards.find();
      res.json(cards);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Id is not found" });
      }
      const card = await Cards.findById(id);
      res.json(card);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async update(req, res) {
    try {
      const card = req.body;
      if (!card._id) {
        return res.status(400).json({ error: "Id is not found" });
      }
      const newCard = await Cards.findByIdAndUpdate(card._id, card, {
        new: true,
      });
      res.json(newCard);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Id is not found" });
      }
      const deletedCard = await Cards.findByIdAndDelete(id);
      res.json(deletedCard);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new CardsController();
