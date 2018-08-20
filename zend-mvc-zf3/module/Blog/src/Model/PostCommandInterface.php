<?php
/**
 * Created by Pradeep Srivastav (pradeep.srivastav@rsystems.com)
 * Date: 08/16/2018 - Time: 18:10
 */

namespace Blog\Model;


interface PostCommandInterface
{

    public function insertPost(Post $post);
    public function updatePost(Post $post);
    public function deletePost(Post $post);
}