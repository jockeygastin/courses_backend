/**
 * course controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::course.course",
  ({ strapi }) => ({
    find: async (ctx) => {
      try {
        const res = await strapi.documents("api::course.course").findMany({
          fields: ["name", "description", "price"], //course fields

          //   We access relations and media like this
          populate: {
            lessons: {
              fields: ["name"], // lesson fields
            },
            cover:{
                fields: ['url']
            }
          },
        });

        return res;
        // ctx.body = res;
      } catch (error) {
        ctx.internalServerError(error);
      }
    },
  })
);
