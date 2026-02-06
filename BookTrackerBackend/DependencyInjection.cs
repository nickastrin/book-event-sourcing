using BookTracker.Api.Features.Books.Models;
using BookTracker.Api.Features.Books.Services;
using JasperFx;
using Marten;
using Marten.Events.Projections;
using Microsoft.AspNetCore.OpenApi;

namespace BookTracker.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddOpenApi();
        services.Configure<RouteOptions>(options => options.LowercaseUrls = true);
        return services;
    }
    
    public static IServiceCollection AddMartenConfig(
        this IServiceCollection services,
        IConfiguration configuration,
        IWebHostEnvironment environment)
    {
        var connectionString = configuration.GetConnectionString("BookTracker")
            ?? throw new Exception("Connection string not found");

        services.AddMarten(source => { 
            source.Connection(connectionString);
            source.Projections.Snapshot<Book>(SnapshotLifecycle.Inline);
            
            if (environment.IsDevelopment())
            {
                source.AutoCreateSchemaObjects = AutoCreate.All;
            }
        }).UseLightweightSessions();

        return services;
    }

    public static IServiceCollection AddServices(
        this IServiceCollection services)
    {
        services.AddScoped<IBookService, BookService>();

        return services;
    }
}