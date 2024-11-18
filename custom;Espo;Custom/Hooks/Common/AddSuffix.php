<?php
namespace Espo\Custom\Hooks\Common;

use Espo\ORM\Entity;

class AddSuffix
{    
    public function beforeSave(Entity $entity, array $options): void
    {
        error_log('Hook spuštěn pro entitu: ' . $entity->getEntityType());

        // Hook platí pouze pro Account a Apertia
        $entityType = $entity->getEntityType();
        if (in_array($entityType, ['Account', 'CApertia'])) {
            if ($entity->isNew() && $entity->has('name')) {
                $currentName = $entity->get('name');
                $entity->set('name', $currentName . ' - Apertia');
            }
        }
    }
}
?>