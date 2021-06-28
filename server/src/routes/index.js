const express = require("express");
const controller = require("../controllers");

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: Posts
 *    description: Post it here.
 * components:
 *  schemas:
 *      Post:
 *         type: object
 *         required:
 *              - username
 *              - topic
 *              - text
 *         properties:
 *              id:
 *                  type: objectId
 *                  description: Auto-generated id of post.
 *              username:
 *                  type: string
 *                  description: Username
 *              topic:
 *                  type: string
 *                  description: Topic
 *              text:
 *                  type: string
 *                  description: Text
 *         example:
 *              id: 60d2b87946896c50ec19acd7
 *              username: TestTest
 *              topic: Test
 *              text: TestTest
 */

/**
 * @swagger
 * /post:
 *      get:
 *          tags: [Posts]
 *          summary: Return list of all the post.
 *          responses:
 *              200:
 *                  description: The list of posts
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#components/schemas/Post'  
 *      post:
 *          tags: [Posts]
 *          summary: Post into the db.
 *          requestBody:
 *              required: true
 *              description: Post-it into the db.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Post' 
 *          responses:
 *              200:
 *                  description: The list of posts.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/Post'
 *              500:
 *                  description: Error
 * /post/{id}:
 *      put:
 *          tags: [Posts]
 *          summary: Update post-it.
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: postId
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Post'
 *          responses:
 *              200:
 *                  description: Updated post.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/Post'
 *      delete:
 *          tags: [Posts]
 *          summary: Delete post-it.
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: postId
 *          responses:
 *              200:
 *                  description: Deleted post.
 */

router.get("/post", controller.getPost);

router.post("/post", controller.createPost);

router.put("/post/:id", controller.updatePost);

router.delete("/post/:id", controller.deletePost);

module.exports = router;
