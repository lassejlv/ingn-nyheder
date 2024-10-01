import { EntrySkeletonType } from 'contentful';

export interface News extends EntrySkeletonType {
   fields: {
      title: string;
      description: string;
      slug: string;
      body: string;
      images: {
         fields: {
            file: {
               url: string;
            };
         };
      }[];
   };
}
