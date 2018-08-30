<?php

namespace Album\Model\Entity;

use DomainException;
use Zend\Stdlib\ArraySerializableInterface;

class AlbumEntity implements ArraySerializableInterface
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $artist;

    /**
     * @var string
     */
    private $title;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getArtist()
    {
        return $this->artist;
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        if ($id <= 0) {
            throw new DomainException(
                'Album id must be a positive integer!'
            );
        }

        $this->id = $id;
    }

    /**
     * @param string $artist
     */
    public function setArtist($artist)
    {
        if (empty($artist) || strlen($artist) > 100) {
            throw new DomainException(
                'Album artist must be between 1 and 100 chars!'
            );
        }

        $this->artist = $artist;
    }

    /**
     * @param string $title
     */
    public function setTitle($title)
    {
        if (empty($title) || strlen($title) > 100) {
            throw new DomainException(
                'Album title must be between 1 and 100 chars!'
            );
        }

        $this->title = $title;
    }

    /**
     * @param array $array
     */
    public function exchangeArray(array $array)
    {
        foreach ($array as $key => $value) {
            $setter = 'set' . ucfirst($key);

            if (method_exists($this, $setter)) {
                $this->{$setter}($value);
            }
        }
    }

    /**
     * @return array
     */
    public function getArrayCopy()
    {
        $data = [];

        foreach (get_object_vars($this) as $key => $value) {
            $data[$key] = $value;
        }

        return $data;
    }
}
