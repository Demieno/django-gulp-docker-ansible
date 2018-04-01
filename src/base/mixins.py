from django.urls import reverse
from django.utils.text import ugettext_lazy as _
from django.views.generic.base import ContextMixin
import logging

logger = logging.getLogger(__name__)


class BreadcrumbsMixin(ContextMixin):
    """
    Override `ContextMixin`

    Add `breadcrumbs` in context.

    Usage in template:
        `<a href={{ breadcrumb.url }}> {{ breadcrumb.title }} </a>`
    """
    def get_breadcrumbs(self):
        """
        Return list of breadcrumbs
        :return: list of dict,
                    - keys: `url`, `title`
        """
        return [self.main_page_breadcrumbs]

    @property
    def main_page_breadcrumbs(self):
        """
        Breadcrumb of `main_page` always top in list
        :return dict, keys `url`, `title`
        """
        return {'url': reverse('news:home'),
                'title': _("Главная")}

    def get_context_data(self, **kwargs):
        context = super(BreadcrumbsMixin, self).get_context_data(**kwargs)
        context['breadcrumbs'] = self.get_breadcrumbs()
        return context


class AbstractBreadcrumbs(BreadcrumbsMixin):
    """
    Abstract class
    required in child: `url`, `title`.
    optional `parents`: list or tuple of dict with keys `url`, `title`.

    `url` must wrap in `@property` decorator if is taken from `reverse()` method, :
    ```
        @property
        def url(self):
            return reverse('view_name')
    ```
    """
    title = None
    url = None
    parents = None

    def get_breadcrumbs(self):
        _breadcrumbs = []
        # if has parents list
        if self.get_parents() is not None and isinstance(self.parents, (list, tuple)):
            for breadcrumb in self.parents:
                # each item append to breadcrumbs
                _breadcrumbs.append(breadcrumb)
        # add self breadcrumb
        _breadcrumbs.append(self.get_breadcrumb())
        return _breadcrumbs

    @property
    def breadcrumbs(self):
        """ return with all parents breadcrumbs"""
        return self.get_breadcrumbs()

    def get_breadcrumb(self):
        # here generate self breadcrumb.
        return dict(url=self.get_url(), title=self.get_title())

    def get_parents(self):
        # here generate all parents breadcrumbs.
        if self.parents is None:
            self.parents = (self.main_page_breadcrumbs, )
        else:
            self.parents = [self.main_page_breadcrumbs] + [parent for parent in self.parents]
        return self.parents

    def get_title(self):
        return self.title

    def get_url(self):
        return self.url

    @property
    def first_parent(self):
        if self.get_parents() is not None:
            return self.parents[-1]
        return None


def make_breadcrumbs(title, view_name, kwargs=None):
    # try:
    #     return dict(url=reverse(view_name, kwargs=kwargs), title=title)
    # except Exception as e:
    #     logger.warning(e)
    return dict(url=reverse(view_name, kwargs=kwargs), title=title)
