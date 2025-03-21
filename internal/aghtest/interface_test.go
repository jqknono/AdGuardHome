package aghtest_test

import (
	"github.com/jqknono/AdGuardHome/internal/aghtest"
	"github.com/jqknono/AdGuardHome/internal/client"
	"github.com/jqknono/AdGuardHome/internal/dnsforward"
	"github.com/jqknono/AdGuardHome/internal/filtering"
)

// Put interface checks that cause import cycles here.

// type check
var _ filtering.Resolver = (*aghtest.Resolver)(nil)

// type check
var _ dnsforward.ClientsContainer = (*aghtest.ClientsContainer)(nil)

// type check
//
// TODO(s.chzhen):  It's here to avoid the import cycle.  Remove it.
var _ client.AddressProcessor = (*aghtest.AddressProcessor)(nil)

// type check
//
// TODO(s.chzhen):  It's here to avoid the import cycle.  Remove it.
var _ client.AddressUpdater = (*aghtest.AddressUpdater)(nil)
