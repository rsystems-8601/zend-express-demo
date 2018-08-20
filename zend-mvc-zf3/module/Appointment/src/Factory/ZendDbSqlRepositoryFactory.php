<?php
/**
 * Created by Damien G. (damien.galicher@gmail.com)
 * Date: 08/08/2016 - Time: 18:30
 */

namespace Appointment\Factory;

use Appointment\Model\Post;
use Interop\Container\ContainerInterface;
use Zend\Db\Adapter\AdapterInterface;
use Appointment\Model\ZendDbSqlRepository;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\Hydrator\Reflection as ReflectionHydrator;

class ZendDbSqlRepositoryFactory implements FactoryInterface
{

    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        return new ZendDbSqlRepository(
            $container->get(AdapterInterface::class),
            new ReflectionHydrator(),
            new Post('', '')
        );
    }

}