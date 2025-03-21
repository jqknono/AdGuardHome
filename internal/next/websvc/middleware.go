package websvc

import (
	"net/http"

	"github.com/AdguardTeam/golibs/httphdr"
	"github.com/jqknono/AdGuardHome/internal/aghhttp"
)

// jsonMw sets the content type of the response to application/json.
func jsonMw(h http.Handler) (wrapped http.HandlerFunc) {
	f := func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set(httphdr.ContentType, aghhttp.HdrValApplicationJSON)

		h.ServeHTTP(w, r)
	}

	return http.HandlerFunc(f)
}
