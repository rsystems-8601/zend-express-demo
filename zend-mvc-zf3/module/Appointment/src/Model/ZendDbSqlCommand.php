<?php
/**
 * Created by Damien G. (damien.galicher@gmail.com)
 * Date: 08/08/2016 - Time: 19:45
 */

namespace Appointment\Model;

use RuntimeException;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\Driver\ResultInterface;
use Zend\Db\Sql\Delete;
use Zend\Db\Sql\Insert;
use Zend\Db\Sql\Sql;
use Zend\Db\Sql\Update;

class ZendDbSqlCommand implements PostCommandInterface
{
    /**
     * @var AdapterInterface
     */
    private $db;

    /**
     * @param AdapterInterface $db
     */
    public function __construct(AdapterInterface $db)
    {
        $this->db = $db;
    }

    /**
     * {@inheritDoc}
     */
    public function insertPost(Post $post)
    {
        $insert = new Insert('user_booking');
        $insert->values([
            'username' => $post->getUsername(),
            'reason' => $post->getReason(),
            'bookingdate' => $post->getBookingdate(),
        ]);

        $sql = new Sql($this->db);
        $statement = $sql->prepareStatementForSqlObject($insert);
        $result = $statement->execute();

        if (! $result instanceof ResultInterface) {
            throw new RuntimeException(
                'Database error occurred during appointment post insert operation'
            );
        }

        $id = $result->getGeneratedValue();

        return new Post(
            $post->getUsername(),
            $post->getReason(),
			$result->getGeneratedValue(),
            $post->getBookingdate()            
        );
    }

    /**
     * @param Post $post
     * @return Post
     */
    public function updatePost(Post $post)
    {
        if (! $post->getId()) {
            throw RuntimeException('Cannot update post; missing identifier');
        }

        $update = new Update('user_booking');
        $update->set([
            'username' => $post->getUsername(),
            'reason' => $post->getReason(),
            'bookingdate' => $post->getBookingdate(),
        ]);
        $update->where(['id = ?' => $post->getId()]);

        $sql = new Sql($this->db);
        $statement = $sql->prepareStatementForSqlObject($update);
        $result = $statement->execute();

        if (! $result instanceof ResultInterface) {
            throw new RuntimeException(
                'Database error occurred during appointment post update operation'
            );
        }

        return $post;
    }

    /**
     * @param Post $post
     * @return bool
     */
    public function deletePost(Post $post)
    {
        if (! $post->getId()) {
            throw RuntimeException('Cannot update post; missing identifier');
        }

        $delete = new Delete('user_booking');
        $delete->where(['id = ?' => $post->getId()]);

        $sql = new Sql($this->db);
        $statement = $sql->prepareStatementForSqlObject($delete);
        $result = $statement->execute();

        if (! $result instanceof ResultInterface) {
            return false;
        }

        return true;
    }
}