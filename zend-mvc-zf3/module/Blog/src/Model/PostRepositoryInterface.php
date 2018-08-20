<?php
/**
 * Created by Pradeep Srivastav (pradeep.srivastav@rsystems.com)
 * Date: 08/16/2018 - Time: 17:49
 */

namespace Blog\Model;


interface PostRepositoryInterface
{

    public function findAllPosts();
    public function findPost($id);
}