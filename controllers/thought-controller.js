const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');

//this defines the thoughtcontroller object, and is able to handle API requests related to thoughts.
const ThoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        }catch (err) {
            res.status(500).json(err);
        }
    },

    //this handler is for the GET thought by ID Api endpoint
    async getThoughtsById(req, res) {
        try{
            const thought = await Thought.findOne({_id:req.params.thoughtId});
            if (!thought) {
                res.status(404).json({ message: 'Cannot find Thought'});
            }else {
                res.json(thought);

            }
        }catch (err) {
            res.status(500).json(err);
        }
    },
    //this handler is for the CREATE thought by ID Api endpoint
    async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          res.status(201).json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },

     //this handler is for the DELETE thought by ID Api endpoint

    async deleteThought(req, res) {
        try{
            const thought = await Thought.findByIdAndDelete({_Id:req.params.thoughtId});
            res.status(200).json(thought);
        }catch (err) {
            res.status(500).json(err);
        }
    },

    //this handler is for the UPDATE thought by ID Api endpoint
    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
                new: true,
            });
            if (!thought) {
                res.status(404).json({message: 'cannot find thought'});
            }else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(e);
        }
    },

    //this handler is for the CREATE Reaction Api endpoint
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id:req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new:true}
            );
            thought ? res.json(thought) : res.status(404).json({message: notFound});
        }catch (e) {
            res.status(500).json(e)
        }
    },
    
    //this handler is for the DELETE Reaction Api endpoint
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findONeAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            );

            thought ? res.json(thought) : res.status(404).json({message: notFound});
        }catch (e) {
            res.status(500).json(e);

        }
    },


};

//this exports the ThoughtController
module.exports = ThoughtController;