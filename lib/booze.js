import {Mongo} from 'meteor/mongo';

export const Booze = new Mongo.Collection('booze');
export const BoozeGroups = new Mongo.Collection('boozegroups');
export const Settings = new Mongo.Collection('settings');
