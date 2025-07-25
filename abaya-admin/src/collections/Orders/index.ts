// src/collections/index.ts
import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerEmail', 'total', 'status', 'createdAt'],
    description: 'Beheer alle bestellingen van je abaya shop'
  },
  access: {
    read: ({ req: { user } }) => Boolean(user), // Alleen admins kunnen orders zien
    create: () => true, // API kan orders aanmaken
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user)
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      label: 'Bestelnummer',
      admin: {
        readOnly: true,
        description: 'Wordt automatisch gegenereerd'
      }
    },
    {
      name: 'customerInfo',
      type: 'group',
      label: 'Klantgegevens',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Email'
        },
        {
          name: 'firstName',
          type: 'text',
          required: true,
          label: 'Voornaam'
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
          label: 'Achternaam'
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefoonnummer'
        }
      ]
    },
    {
      name: 'shippingAddress',
      type: 'group',
      label: 'Verzendadres',
      fields: [
        {
          name: 'street',
          type: 'text',
          required: true,
          label: 'Straat + huisnummer'
        },
        {
          name: 'city',
          type: 'text',
          required: true,
          label: 'Plaats'
        },
        {
          name: 'postalCode',
          type: 'text',
          required: true,
          label: 'Postcode'
        },
        {
          name: 'country',
          type: 'text',
          required: true,
          defaultValue: 'Nederland',
          label: 'Land'
        }
      ]
    },
    {
      name: 'billingAddress',
      type: 'group',
      label: 'Factuuradres',
      fields: [
        {
          name: 'sameAsShipping',
          type: 'checkbox',
          defaultValue: true,
          label: 'Zelfde als verzendadres'
        },
        {
          name: 'street',
          type: 'text',
          label: 'Straat + huisnummer',
          admin: {
            condition: (data) => !data.sameAsShipping
          }
        },
        {
          name: 'city',
          type: 'text',
          label: 'Plaats',
          admin: {
            condition: (data) => !data.sameAsShipping
          }
        },
        {
          name: 'postalCode',
          type: 'text',
          label: 'Postcode',
          admin: {
            condition: (data) => !data.sameAsShipping
          }
        },
        {
          name: 'country',
          type: 'text',
          label: 'Land',
          admin: {
            condition: (data) => !data.sameAsShipping
          }
        }
      ]
    },
    {
      name: 'items',
      type: 'array',
      label: 'Bestelde Producten',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
          label: 'Product'
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          label: 'Aantal'
        },
        {
          name: 'size',
          type: 'text',
          required: true,
          label: 'Maat'
        },
        {
          name: 'color',
          type: 'text',
          required: true,
          label: 'Kleur'
        },
        {
          name: 'unitPrice',
          type: 'number',
          required: true,
          label: 'Prijs per stuk (€)'
        },
        {
          name: 'totalPrice',
          type: 'number',
          required: true,
          label: 'Totaal prijs (€)'
        }
      ]
    },
    {
      name: 'pricing',
      type: 'group',
      label: 'Prijsberekening',
      fields: [
        {
          name: 'subtotal',
          type: 'number',
          required: true,
          label: 'Subtotaal (€)'
        },
        {
          name: 'shippingCost',
          type: 'number',
          required: true,
          defaultValue: 0,
          label: 'Verzendkosten (€)'
        },
        {
          name: 'tax',
          type: 'number',
          required: true,
          label: 'BTW (€)'
        },
        {
          name: 'discount',
          type: 'number',
          defaultValue: 0,
          label: 'Korting (€)'
        },
        {
          name: 'total',
          type: 'number',
          required: true,
          label: 'Totaal (€)'
        }
      ]
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: '🟡 Betaling Verwerken', value: 'pending-payment' },
        { label: '✅ Betaald', value: 'paid' },
        { label: '📦 In Behandeling', value: 'processing' },
        { label: '🚚 Verzonden', value: 'shipped' },
        { label: '✅ Geleverd', value: 'delivered' },
        { label: '❌ Geannuleerd', value: 'cancelled' },
        { label: '↩️ Retour', value: 'returned' }
      ],
      defaultValue: 'pending-payment',
      required: true,
      label: 'Status'
    },
    {
      name: 'payment',
      type: 'group',
      label: 'Betaling',
      fields: [
        {
          name: 'method',
          type: 'select',
          options: [
            { label: 'iDeal', value: 'ideal' },
            { label: 'Creditcard', value: 'card' },
            { label: 'PayPal', value: 'paypal' },
            { label: 'Bancontact', value: 'bancontact' },
            { label: 'SOFORT', value: 'sofort' }
          ],
          label: 'Betaalmethode'
        },
        {
          name: 'paymentId',
          type: 'text',
          label: 'Stripe Payment ID'
        },
        {
          name: 'paidAt',
          type: 'date',
          label: 'Betaald op'
        }
      ]
    },
    {
      name: 'shipping',
      type: 'group',
      label: 'Verzending',
      fields: [
        {
          name: 'method',
          type: 'select',
          options: [
            { label: 'PostNL Standaard', value: 'postnl-standard' },
            { label: 'PostNL Express', value: 'postnl-express' },
            { label: 'DHL', value: 'dhl' },
            { label: 'Ophalen', value: 'pickup' }
          ],
          label: 'Verzendmethode'
        },
        {
          name: 'trackingNumber',
          type: 'text',
          label: 'Track & Trace Code'
        },
        {
          name: 'trackingUrl',
          type: 'text',
          label: 'Track & Trace Link'
        },
        {
          name: 'shippedAt',
          type: 'date',
          label: 'Verzonden op'
        },
        {
          name: 'expectedDelivery',
          type: 'date',
          label: 'Verwachte levering'
        }
      ]
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Interne Notities',
      admin: {
        description: 'Notities die alleen admins kunnen zien'
      }
    },
    {
      name: 'customerNotes',
      type: 'textarea',
      label: 'Klant Opmerkingen',
      admin: {
        description: 'Opmerkingen van de klant bij de bestelling'
      }
    }
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Genereer order nummer als die er nog niet is
        if (!data.orderNumber) {
          data.orderNumber = `ABY-${Date.now()}`
        }
        return data
      }
    ]
  }
}

export default Orders
