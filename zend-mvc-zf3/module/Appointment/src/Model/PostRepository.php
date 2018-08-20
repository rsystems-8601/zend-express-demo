<?php
/**
 * Created by Damien G. (damien.galicher@gmail.com)
 * Date: 08/08/2016 - Time: 17:50
 */

namespace Appointment\Model;

use DomainException;

class PostRepository implements PostRepositoryInterface
{
    private $data = [
        1 => [
            'id'    => 1,
            'username' => 'Hello World #1',
            'text'  => 'This is our first appointment post!',
        ],
        2 => [
            'id'    => 2,
            'username' => 'Hello World #2',
            'text'  => 'This is our second appointment post!',
        ],
        3 => [
            'id'    => 3,
            'username' => 'Hello World #3',
            'text'  => 'This is our third appointment post!',
        ],
        4 => [
            'id'    => 4,
            'username' => 'Hello World #4',
            'text'  => 'This is our fourth appointment post!',
        ],
        5 => [
            'id'    => 5,
            'username' => 'Hello World #5',
            'text'  => 'This is our fifth appointment post!',
        ],
    ];

    /**
     * {@inheritDoc}
     */
    public function findAllPosts()
    {
        return array_map(function ($post) {
            return new Post(
                $post['username'],
                $post['reason'],
                $post['bookingdate'],
                $post['id']
            );
        }, $this->data);
    }

    /**
     * {@inheritDoc}
     */
    public function findPost($id)
    {
        if (! isset($this->data[$id])) {
            throw new DomainException(sprintf('Appointment by id "%s" not found', $id));
        }

        return new Post(
            $this->data[$id]['username'],
            $this->data[$id]['reason'],			
            $this->data[$id]['bookingdate'],
			$this->data[$id]['id'],
            
        );
    }

}