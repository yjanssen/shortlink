import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const LinksDB = new Mongo.Collection ('links');

if (Meteor.isServer){
    Meteor.publish('linksPub', function (){
        return LinksDB.find({userId:this.userId});
    });
}

//resource.action
Meteor.methods({
    'links.insert'(url) {
        if (!this.userId) {
            throw new Meteor.Error('not -authorized', 'Not authorized for this method');
        }

        new SimpleSchema({
            url: {
                type: String,
                label: 'Your link',
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url })

        LinksDB.insert({
            _id:shortid.generate(),
            url,
            userId: this.userId,
            visible:true,
            visitedCount:0,
            lastVisitedAt:null
        });

    },
    'links.setVisibility'(_id,visible){
        if (!this.userId) {
            throw new Meteor.Error('not -authorized', 'Not authorized for this method');
        }
        //validate id with simpleschema
        new SimpleSchema({
            _id: {
                type: String, 
                min: 1
            },
            visible:{
                type:Boolean,
            }
        }).validate({ _id, visible })

        LinksDB.update({
          _id,
          userId:this.userId  
        },{
            $set:{
                visible
            }
        });
    },
    'links.trackVisit'(_id){
        new SimpleSchema({
            _id: {
                type: String, 
                min: 1
            }
        }).validate({ _id })

        LinksDB.update({ _id },{ 
        $set: {
            lastVisitedAt : new Date().getTime()
        },
        $inc:{
            visitedCount: 1
        }
     });
    }
});