import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';
import moment from 'moment';


import '../imports/api/users';
import {LinksDB} from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';


Meteor.startup(() => {
  
  //url management
  WebApp.connectHandlers.use((req,res,next)=>{
    const _id = req.url.slice(1);
    const link = LinksDB.findOne({_id});

    if (link){
      res.statusCode = '302';
      res.setHeader('location',link.url);
      res.end();
      //name of methods with dot needs quote marks
      Meteor.call('links.trackVisit',_id);
    } else {
      next();
    }
  });

});
